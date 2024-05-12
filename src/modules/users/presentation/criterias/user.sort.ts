import { Sort } from 'src/shared/paginator/abstractClass';
import { IsSort } from 'src/shared/paginator/decorators';
import { SortEnum } from 'src/shared/paginator/enums';

export class UserSort extends Sort {
    @IsSort()
    public readonly createdAt: SortEnum;

    @IsSort()
    public readonly updatedAt: SortEnum;

    @IsSort()
    public readonly deletedAt: SortEnum;
}
