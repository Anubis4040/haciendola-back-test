import { Filter } from 'src/shared/paginator/abstractClass';
import { IsString } from 'class-validator';
import { ValidateIfPropertyExists } from 'src/shared/app/decorators';
import { Product } from '../../domain/entities';

export enum ProductFilters {
    SEARCH = 'search',
}

export class ProductFilter extends Filter<Product> {
    @IsString()
    @ValidateIfPropertyExists()
    public readonly search: string;
}
