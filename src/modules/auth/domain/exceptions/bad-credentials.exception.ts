import { HttpStatus } from '@nestjs/common';
import { HttpErrorException } from 'src/shared/app/exceptions';

export class BadCredentialsException extends HttpErrorException {
    constructor() {
        super('Bad credentials', 'Forbidden', HttpStatus.FORBIDDEN);
    }
}
