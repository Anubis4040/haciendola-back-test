import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories';
import { CreateProductDto } from '../../presentation/dtos/create-product.dto';
import { Product } from '../entities';
import { User } from 'src/modules/users/domain/entities';

@Injectable()
export class SaveProductUseCase {
    constructor(private readonly productRespository: ProductRepository) {}

    async handle(data: CreateProductDto, AuthUser: User) {
        const user = new User(AuthUser);
        return await this.productRespository.save(new Product({ ...data, user }));
    }
}
