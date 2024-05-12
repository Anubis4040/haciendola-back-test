import { HttpErrorException } from './http-error.exception';
import { HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpErrorException {
    constructor(entityName?: string, error?: string) {
        super(`${entityName ?? 'Entity'} not found`, error ?? 'Not Found', HttpStatus.NOT_FOUND);
    }
}
