import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '../interceptors';
import { Provider } from '@nestjs/common';

export const ResponseInterceptorProvider: Provider = {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
};
