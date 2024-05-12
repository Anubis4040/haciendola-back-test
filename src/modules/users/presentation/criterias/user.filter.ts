import { Filter } from 'src/shared/paginator/abstractClass';
import { User } from '../../domain/entities';
import { IsString } from 'class-validator';
import { ValidateIfPropertyExists } from 'src/shared/app/decorators';

export enum UserFilters {
    SEARCH = 'search',
    EMAIL = 'email',
    PARTIAL_REMOVED = 'deletedAt',
    WITH_PARTIAL_REMOVED = 'withPartialRemoved',
}

export class UserFilter extends Filter<User> {
    @IsString()
    @ValidateIfPropertyExists()
    public readonly search: string;
}
