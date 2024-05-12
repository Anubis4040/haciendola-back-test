import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BaseRepository } from 'src/shared/typeorm/abstractClass';
import { FindOperator } from 'typeorm';
import { UniqueAttributeException } from '../exceptions';

interface IUniqueConfig<T = any> {
    repository: any;
    validate: { [P in keyof T]?: T[P] | FindOperator<T> };
    refValue?: string | any;
}

@Injectable()
export class UniqueService {
    constructor(private readonly moduleRef: ModuleRef) {}

    async validate<T = any>(config: IUniqueConfig<T>): Promise<void> {
        const { repository, validate, refValue } = config;

        const _repository: BaseRepository<T> = this.moduleRef.get(repository, { strict: false });

        const attrs = Object.keys(validate);

        for await (const attr of attrs) {
            if (validate[<keyof T>attr]) {
                const exist = await _repository.exist({ [attr]: validate[<keyof T>attr] }, ['id'], false);

                if (refValue && exist && exist.id !== refValue) {
                    throw new UniqueAttributeException(attr);
                } else if (!refValue && exist) {
                    throw new UniqueAttributeException(attr);
                }
            }
        }
    }
}
