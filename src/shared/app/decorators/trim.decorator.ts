import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { PrototypeToString, StringPrototypes } from '../utils';

export const Trim = () => {
    return applyDecorators(
        Transform(({ value }) => {
            if (!PrototypeToString(value, StringPrototypes.STRING)) {
                return value;
            }

            return value.replaceAll(/\s+/g, ' ').trim();
        }),
    );
};
