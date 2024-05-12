import { Injectable, Logger } from '@nestjs/common';
import { BaseRepository } from 'src/shared/typeorm/abstractClass';
import { User } from '../../domain/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from '../schemas';
import { CriteriaBuilder } from 'src/shared/paginator';
import { PgSqlFilterCriteria } from 'src/shared/typeorm/helpers';
import { UserFilters } from '../../presentation/criterias';
import { Paginator } from 'src/shared/typeorm/pagination';

@Injectable()
export class UserRepository extends BaseRepository<User> {
    private readonly logger = new Logger(UserRepository.name);
    constructor(@InjectRepository(UserSchema) repository: Repository<User>) {
        super(User.name, repository);
    }

    async list(criteria: CriteriaBuilder) {
        const queryBuilder = this.repository.createQueryBuilder('i');

        const filter = new PgSqlFilterCriteria(criteria.getFilter<any>(), queryBuilder);

        void queryBuilder.where('1 = 1');

        void (await filter.search(
            UserFilters.SEARCH,
            {
                partialMatch: true,
                attributesDB: [
                    { name: 'firstName', setWeight: 'A' },
                    { name: 'lastName', setWeight: 'A' },
                    { name: 'userName', setWeight: 'A' },
                    { name: 'email', setWeight: 'A' },
                ],
            },
            'andWhere',
        ));

        return new Paginator(queryBuilder, criteria);
    }

    async findByEmailOrUserName(value: string): Promise<User> {
        this.logger.log('Finding user by email or userName...');
        const user = await this.repository.findOne({ where: [{ email: value }, { userName: value }] });
        this.logger.log('User found successfully!');
        return user;
    }
}
