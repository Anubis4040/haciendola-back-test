import { ApiProperty } from '@nestjs/swagger';
import { Serializer } from 'src/shared/serializer/abstractClass/serializer';
import { Expose } from 'class-transformer';
import { Product } from '../../domain/entities';

export class ProductSerializer extends Serializer {
    @Expose()
    @ApiProperty({
        description: 'Hnadler of the product',
        example: 'cola-glitter-23-grs',
    })
    public handle: string;

    @Expose()
    @ApiProperty({
        description: 'Title of the product',
        example: 'COLA GLITTER 23 GRS',
    })
    public title: string;

    @Expose()
    @ApiProperty({
        description: 'Description of the product',
        example: '<p><strong>Características:</strong></p>',
    })
    public description: string;

    @Expose()
    @ApiProperty({
        description: 'Sku of the product',
        example: 'johndoe@mail.com',
    })
    public sku: string;

    @Expose()
    @ApiProperty({
        description: 'Grams of the product',
        example: '10',
    })
    public grams: string;

    @Expose()
    @ApiProperty({
        description: 'Stock of the product',
        example: '100',
    })
    public stock: string;

    @Expose()
    @ApiProperty({
        description: 'Price of the product',
        example: '150',
    })
    public price: string;

    @Expose()
    @ApiProperty({
        description: 'Compare price of the product',
        example: '150',
    })
    public comparePrice: string;

    @Expose()
    @ApiProperty({
        description: 'Barcode of the product',
        example: '070565',
    })
    public barcode: string;

    override async build(data: Product): Promise<void> {
        super.build(data);
    }
}
