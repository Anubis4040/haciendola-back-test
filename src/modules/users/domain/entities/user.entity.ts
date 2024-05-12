import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/shared/app/abstractClass';

@Exclude()
export class User extends BaseEntity {
    public firstName: string;
    public lastName: string;
    public userName: string;
    public email: string;
    public password: string;

    constructor(data: Partial<User>) {
        super();
        this.build(data);
    }
}
