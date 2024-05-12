import { HttpStatus } from '@nestjs/common';
import { HttpErrorException } from 'src/shared/app/exceptions';

export class AccessDeniedException extends HttpErrorException {
    constructor() {
        super('Access Denied', 'Forbidden', HttpStatus.FORBIDDEN);
    }
}
