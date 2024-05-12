import { Module } from '@nestjs/common';
import { ProductRepository } from './infrastructure/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSchema } from './infrastructure/schemas';
import { ProductController } from './presentation/controllers/product.controller';
import { DeleteProductUseCase, GetProductUseCase, ListProductsUseCase, SaveProductUseCase } from './domain/useCases';
import { UpdateProductUseCase } from './domain/useCases/update-product.useCase';

@Module({
    imports: [TypeOrmModule.forFeature([ProductSchema])],
    controllers: [ProductController],
    providers: [ProductRepository, UpdateProductUseCase, SaveProductUseCase, DeleteProductUseCase, ListProductsUseCase, GetProductUseCase],
    exports: [],
})
export class ProductModule {}
