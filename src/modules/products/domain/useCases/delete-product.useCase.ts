import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories';

@Injectable()
export class DeleteProductUseCase {
    constructor(private readonly productRespository: ProductRepository) {}

    async handle(id: string) {
        return await this.productRespository.delete({ where: { id } }, true);
    }
}
