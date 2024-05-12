import { v4 as uuidV4 } from 'uuid';

export abstract class BaseEntity<T = any> {
    public id: string;
    public createdAt: Date | number;
    public updatedAt: Date | number;
    public deletedAt?: Date | number | null;

    protected constructor() {
        this.id = uuidV4();
    }

    build(data: Partial<T>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}
