import { CallHandler, ClassSerializerInterceptor, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const serializer = new ClassSerializerInterceptor(this.reflector, { excludeExtraneousValues: true, exposeDefaultValues: true });

        return serializer.intercept(context, next);
    }
}
