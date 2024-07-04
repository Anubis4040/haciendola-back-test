import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthRequest } from '../interfaces';

export const UserTokenId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();

    if (!('user' in request)) {
        throw new Error('userId not found in request object');
    }

    return request.user.id;
});
