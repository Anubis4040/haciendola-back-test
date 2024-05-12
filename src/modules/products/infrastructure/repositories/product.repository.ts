import { Injectable, Logger } from '@nestjs/common';
import { BaseRepository } from 'src/shared/typeorm/abstractClass';
import { Product } from '../../domain/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriteriaBuilder } from 'src/shared/paginator';
import { PgSqlFilterCriteria } from 'src/shared/typeorm/helpers';
import { ProductFilters } from '../../presentation/criterias';
import { Paginator } from 'src/shared/typeorm/pagination';
import { ProductSchema } from '../schemas';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
    private readonly logger = new Logger(ProductRepository.name);
    constructor(@InjectRepository(ProductSchema) repository: Repository<Product>) {
        super(Product.name, repository);
    }

    async list(criteria: CriteriaBuilder) {
        const queryBuilder = this.repository.createQueryBuilder('i');

        const filter = new PgSqlFilterCriteria(criteria.getFilter<any>(), queryBuilder);

        void queryBuilder.where('1 = 1');

        void (await filter.search(
            ProductFilters.SEARCH,
            {
                partialMatch: true,
                attributesDB: [
                    { name: 'title', setWeight: 'A' },
                    { name: 'sku', setWeight: 'A' },
                ],
            },
            'andWhere',
        ));

        return new Paginator(queryBuilder, criteria);
    }
}
