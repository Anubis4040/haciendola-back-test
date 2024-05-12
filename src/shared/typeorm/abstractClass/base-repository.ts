import { FindOneOptions, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import { MoreOptionsInterface } from '../interfaces';
import { NotFoundException } from 'src/shared/app/exceptions';

export abstract class BaseRepository<T extends ObjectLiteral> {
    protected readonly entityName: string;
    protected readonly repository: Repository<T>;

    protected constructor(entityName: string, repository: Repository<T>) {
        this.entityName = entityName;
        this.repository = repository;
    }

    async save(entity: T): Promise<T> {
        return await this.repository.save(entity);
    }

    async saveAndFind(entity: T): Promise<T> {
        const _entity = await this.repository.save(entity);

        return await this.getOne(_entity.id);
    }

    async saveMany(entities: T[]): Promise<T[]> {
        return await this.repository.save(entities);
    }

    async getOne(id: string, moreOptions: MoreOptionsInterface = { withDeleted: false, initThrow: true }): Promise<T> {
        const { withDeleted, initThrow } = moreOptions;
        const entity: T = await this.repository.findOne({ withDeleted, where: { id } as any });

        if (!entity && initThrow) {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async update(entity: T): Promise<T> {
        return await this.repository.save(entity);
    }

    async delete(options: FindOneOptions<T>, deletePermanently = false): Promise<T> {
        const entity: any = await this.repository.findOne(options);

        if (!entity) {
            throw new NotFoundException(this.entityName);
        }

        if (!deletePermanently) {
            await this.repository.softDelete(entity.id);
            entity.deletedAt = Date.now();
        } else {
            await this.repository.delete(entity.id);
        }

        return entity;
    }

    async getOneBy(options: FindOneOptions<T>, moreOptions: MoreOptionsInterface = { initThrow: true }): Promise<T> {
        const { initThrow } = moreOptions;

        const entity = await this.repository.findOne(options);

        if (initThrow && !entity) {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async getBy(options: FindOptionsWhere<T>, moreOptions: MoreOptionsInterface = { initThrow: true }): Promise<T[]> {
        const { initThrow } = moreOptions;

        const entities = await this.repository.findBy(options);

        if (initThrow && entities.length === 0) {
            throw new NotFoundException(this.entityName);
        }

        return entities;
    }

    async exist<D = any>(condition: Record<string, any> | Record<string, any>[], select: string[], initThrow = false, withDeleted = false): Promise<D> {
        const conditionMap: FindOneOptions = {
            select,
            where: condition,
            loadEagerRelations: false,
            withDeleted,
        };

        const exist = await this.repository.findOne(conditionMap as FindOneOptions<T>);

        if (initThrow && !exist) {
            throw new NotFoundException(this.entityName);
        }

        return exist as unknown as D;
    }

    async restore(options: FindOneOptions<T>): Promise<T> {
        const entity: any = await this.repository.findOne(options);

        if (!entity) {
            throw new NotFoundException(this.entityName);
        }

        void (await this.repository.restore(entity.id));

        entity.deletedAt = null;

        return entity;
    }
}
