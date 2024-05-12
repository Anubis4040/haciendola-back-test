import { Injectable, Logger } from '@nestjs/common';
import { CriteriaBuilder } from 'src/shared/paginator';
import { ProductRepository } from '../../infrastructure/repositories';
import { ClsService } from 'nestjs-cls';
import { IMyStore } from 'src/shared/app/interfaces';
import { Product } from '../entities';

declare interface ListProductsProps {
    criteria: CriteriaBuilder;
}

@Injectable()
export class ListProductsUseCase {
    private readonly logger = new Logger(ListProductsUseCase.name);

    constructor(
        private readonly repository: ProductRepository,
        private readonly store: ClsService<IMyStore>,
    ) {}

    async handle({ criteria }: ListProductsProps): Promise<any> {
        this.logger.log('Listing products');

        const paginator = await this.repository.list(criteria);

        this.logger.log('Products listed successfully');

        const data = (await paginator.paginate()) as Product[];

        this.logger.log('Setting response metadata and pagination...');

        this.store.set('res.pagination', await paginator.getPagination());
        this.store.set('res.metadata', paginator.getMetadata());

        this.logger.log('Response metadata and pagination set successfully');

        return data;
    }
}
