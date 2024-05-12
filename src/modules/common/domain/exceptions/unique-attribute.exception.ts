import { HttpStatus } from '@nestjs/common';
import { HttpErrorException } from 'src/shared/app/exceptions';

export class UniqueAttributeException extends HttpErrorException {
    constructor(name: string | any) {
        super('Duplicate attributes', 'Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY, { duplicated: { key: name } });
    }
}
