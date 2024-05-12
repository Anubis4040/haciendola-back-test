import { applyDecorators } from '@nestjs/common';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { SortEnum } from '../enums';
import { ValidateIfPropertyExists } from 'src/shared/app/decorators';

export const IsSort = () => {
    return applyDecorators(
        IsEnum(SortEnum),
        ValidateIfPropertyExists(),
        Transform(({ value }: TransformFnParams) => (value as string)?.toUpperCase() ?? value),
    );
};
