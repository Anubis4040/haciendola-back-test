import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories';
import { UpdateProductDto } from '../../presentation/dtos/update-product.dto';

@Injectable()
export class UpdateProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async handle(id: string, data: UpdateProductDto) {
        const product = await this.productRepository.getOne(id);
        console.log('product ===> ', product);

        product.build(data);

        console.log('product2 ===> ', product);

        return await this.productRepository.update(product);
    }
}
