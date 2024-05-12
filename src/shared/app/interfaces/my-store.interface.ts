import { ClsStore } from 'nestjs-cls';

export interface IMyStore extends ClsStore {
    res: {
        metadata: object;
        pagination: object;
    };
}
