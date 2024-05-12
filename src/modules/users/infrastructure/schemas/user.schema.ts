import { EntitySchema } from 'typeorm';
import { User } from '../../domain/entities';
import { BaseColumnsSchema } from 'src/shared/typeorm/schemas';

export const UserSchema = new EntitySchema<User>({
    name: User.name,
    target: User,
    tableName: 'users',
    columns: {
        ...BaseColumnsSchema,
        firstName: {
            type: 'varchar',
            length: 255,
        },
        lastName: {
            type: 'varchar',
            length: 255,
        },
        userName: {
            type: 'varchar',
            length: 255,
            unique: true,
        },
        email: {
            type: 'varchar',
            length: 255,
            unique: true,
        },
        password: {
            type: 'varchar',
            length: 255,
        },
        createdAt: {
            type: 'timestamp',
            createDate: true,
        },
        updatedAt: {
            type: 'timestamp',
            updateDate: true,
        },
    },
});
