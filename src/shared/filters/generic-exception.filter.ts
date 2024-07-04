import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GenericExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = 500;

        const responseBody = {
            statusCode: status,
            message: 'Internal server error',
            timestamp: new Date().toISOString(),
        };

        if (exception instanceof HttpException) {
            status = exception.getStatus();
        }

        responseBody.message = exception.message;

        // console.log(exception, 'exception');
        console.log(exception instanceof Error);
        console.log(exception.constructor.name);
        console.log((exception as Error).stack);
        console.log(Object.getOwnPropertyNames(exception));

        response.status(status).json(responseBody);
    }
}
