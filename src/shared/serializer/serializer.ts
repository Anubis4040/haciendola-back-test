import { Logger } from '@nestjs/common';
import { NewConstructor } from './types';
import { BaseSerializer } from './abstractClass';
import { LoggerContext } from '../app/enums';
import { SerializerMap } from './serializer-map';

export const Serializer = async <S extends NewConstructor<BaseSerializer>, D = any>(data: D | D[], serializer?: S | null, returnNull = true): Promise<(D | S)[] | D | S> => {
    const valid = !!data;

    Logger.log(`Data to serialize valid: ${valid}`, LoggerContext.SERIALIZER);

    if (serializer) {
        return valid ? SerializerMap(data, serializer) : returnNull ? null : undefined;
    }

    return valid ? data : returnNull ? null : undefined;
};
