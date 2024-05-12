import { Injectable, Logger } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories';

declare interface GetUserProps {
    id: string;
}

@Injectable()
export class GetProductUseCase {
    private readonly logger = new Logger(GetProductUseCase.name);

    constructor(private readonly productRespository: ProductRepository) {}

    async handle({ id }: GetUserProps): Promise<any> {
        this.logger.log('Getting product');
        const product = await this.productRespository.getOne(id);
        this.logger.log('Product found successfully!');
        return product;
    }
}
