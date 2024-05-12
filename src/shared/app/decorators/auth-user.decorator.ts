import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthRequest } from '../interfaces';

export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();

    if (!('user' in request)) {
        throw new Error('you need to use one of the following decorators @LocalAuth() or @Protected()');
    }

    return request.user;
});
