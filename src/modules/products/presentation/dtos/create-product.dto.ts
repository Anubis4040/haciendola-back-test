import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
    @IsString()
    public handle: string;

    @IsString()
    public title: string;

    @IsString()
    public description: string;

    @IsString()
    public sku: string;

    @IsNumber()
    public grams: number;

    @IsNumber()
    public stock: number;

    @IsNumber()
    public price: number;

    @IsNumber()
    public comparePrice: number;

    @IsString()
    public barcode: string;

    @IsString()
    public userId: string;
}
