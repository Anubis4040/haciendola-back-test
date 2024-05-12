import { RenameProperty } from 'src/shared/app/decorators';
import { DEFAULT_PROPERTIES } from '../constants';

export type DefaultFilters<E> = {
    [Key in keyof E]?: any;
}[];

export abstract class Filter<E = any> {
    @RenameProperty(DEFAULT_PROPERTIES)
    DefaultFilters(): DefaultFilters<E> {
        return [];
    }
}
