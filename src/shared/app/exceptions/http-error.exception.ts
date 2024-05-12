import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpErrorException extends HttpException {
    constructor(message = 'Internal Server Error', error = 'Server Error', statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR, metadata: Record<string, any> = {}) {
        super(
            {
                message: message,
                error: error,
                metadata,
            },
            statusCode,
        );
    }
}
