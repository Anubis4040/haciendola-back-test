import { Controller, Post, Body, Delete, Param, Get, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { DeleteProductUseCase, GetProductUseCase, ListProductsUseCase, SaveProductUseCase, UpdateProductUseCase } from '../../domain/useCases';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Serializer } from 'src/shared/serializer';
import { ProductSerializer } from '../serializers';
import { Criteria, Filter, Pagination, Sort, Uris } from 'src/shared/paginator/decorators';
import { PaginationFilter } from 'src/shared/paginator/filters';
import { CriteriaBuilder, IUris } from 'src/shared/paginator';
import { ProductFilter, ProductSort } from '../criterias';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { Protected } from 'src/modules/auth/presentation/decorators';
import { AuthUser } from 'src/shared/app/decorators';
import { User } from 'src/modules/users/domain/entities';

@Controller('products')
export class ProductController {
    constructor(
        private saveUserUseCase: SaveProductUseCase,
        private deleteProductUseCase: DeleteProductUseCase,
        private listProductsUseCase: ListProductsUseCase,
        private getProductUseCase: GetProductUseCase,
        private readonly updateUseCase: UpdateProductUseCase,
    ) {}

    @Get()
    @Criteria()
    @Protected()
    @HttpCode(HttpStatus.OK)
    async list(@Filter() filters: ProductFilter, @Sort() sorts: ProductSort, @Pagination() pagination: PaginationFilter, @Uris() uris: IUris) {
        const criteria = new CriteriaBuilder({ filters, sorts, pagination, uris });
        return await Serializer(await this.listProductsUseCase.handle({ criteria }), ProductSerializer);
    }

    @Get(':id')
    @Protected()
    @HttpCode(HttpStatus.OK)
    async getProduct(@Param('id') id: string) {
        return await Serializer(await this.getProductUseCase.handle({ id }), ProductSerializer);
    }

    @Post()
    @Protected()
    @HttpCode(HttpStatus.OK)
    async createProduct(@AuthUser() user: User, @Body() createProductDto: CreateProductDto) {
        return await Serializer(await this.saveUserUseCase.handle(createProductDto, user), ProductSerializer);
    }

    @Put(':id')
    @Protected()
    @HttpCode(HttpStatus.OK)
    async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return await Serializer(await this.updateUseCase.handle(id, updateProductDto), ProductSerializer);
    }

    @Delete(':id')
    @Protected()
    @HttpCode(HttpStatus.OK)
    async deleteProduct(@Param('id') id: string) {
        return await Serializer(await this.deleteProductUseCase.handle(id), ProductSerializer);
    }
}
