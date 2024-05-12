import { ValidationError } from '@nestjs/common';
import { isEmpty } from 'class-validator';

export class ErrorModelDto {
    property: string;
    constraints: Record<string, any>;
    children: ErrorModelDto[];

    constructor(errors: ValidationError) {
        this.property = errors.property;
        this.constraints = errors.constraints;

        if (!isEmpty(errors.children)) {
            this.children = errors.children.map((_children) => {
                return new ErrorModelDto(_children);
            });
        }
    }
}
