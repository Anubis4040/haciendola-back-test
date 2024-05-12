import { User } from 'src/modules/users/domain/entities';
import { BaseEntity } from 'src/shared/app/abstractClass';

export class Product extends BaseEntity {
    public handle: string;
    public title: string;
    public description: string;
    public sku: string;
    public grams: number;
    public stock: number;
    public price: number;
    public comparePrice: number;
    public barcode: string;
    public user: User;

    constructor(data: Partial<Product>) {
        super();
        this.build(data);
    }
}
