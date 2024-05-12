import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IUris } from '../pagination.criteria';
import { Request } from 'express';
import configuration from 'src/config/configuration';

export const Uris = createParamDecorator((data: unknown, ctx: ExecutionContext): IUris => {
    const {
        server: { prefix },
    } = configuration();

    const request: Request = ctx.switchToHttp().getRequest<Request>();

    // TODO: check raw property
    return {
        fullUrl: `${request.protocol}://${request.hostname}${request.url}`,
        base: `${request.protocol}://${request.hostname}${prefix}`,
    };
});
