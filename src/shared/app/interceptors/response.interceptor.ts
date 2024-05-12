import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAppResponse, IMyStore } from '../interfaces';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    constructor(private readonly store: ClsService<IMyStore>) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<IAppResponse> {
        return next.handle().pipe(
            map((data: unknown | unknown[]) => {
                return <IAppResponse>{
                    data,
                    pagination: this.store.get('res.pagination'),
                    metadata: this.store.get('res.metadata'),
                };
            }),
        );
    }
}
