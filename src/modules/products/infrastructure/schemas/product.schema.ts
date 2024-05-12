import { EntitySchema } from 'typeorm';
import { Product } from '../../domain/entities';
import { BaseColumnsSchema } from 'src/shared/typeorm/schemas';
import { User } from 'src/modules/users/domain/entities';

export const ProductSchema = new EntitySchema<Product>({
    name: Product.name,
    target: Product,
    tableName: 'products',
    columns: {
        ...BaseColumnsSchema,
        handle: {
            type: 'varchar',
            length: 255,
        },
        title: {
            type: 'varchar',
            length: 255,
            unique: true,
        },
        description: {
            type: 'varchar',
            length: 255,
        },
        sku: {
            type: 'varchar',
            length: 255,
            unique: true,
        },
        grams: {
            type: 'numeric',
        },
        stock: {
            type: 'int',
        },
        price: {
            type: 'numeric',
        },
        comparePrice: {
            type: 'numeric',
        },
        barcode: {
            type: 'varchar',
            length: 255,
        },
    },
    relations: {
        user: {
            target: User.name,
            type: 'many-to-one',
            joinTable: true,
            eager: true,
            nullable: false,
        },
    },
});
