import { Injectable, Logger } from '@nestjs/common';
import { CriteriaBuilder } from 'src/shared/paginator';
import { UserRepository } from '../../infrastructure/repositories';
import { ClsService } from 'nestjs-cls';
import { IMyStore } from 'src/shared/app/interfaces';
import { User } from '../entities';

declare interface ListUsersProps {
    criteria: CriteriaBuilder;
}

@Injectable()
export class ListUsersUseCase {
    private readonly logger = new Logger(ListUsersUseCase.name);

    constructor(
        private readonly repository: UserRepository,
        private readonly store: ClsService<IMyStore>,
    ) {}

    async handle({ criteria }: ListUsersProps): Promise<any> {
        this.logger.log('Listing users');

        const paginator = await this.repository.list(criteria);

        this.logger.log('Users listed successfully');

        const data = (await paginator.paginate()) as User[];

        this.logger.log('Setting response metadata and pagination...');

        this.store.set('res.pagination', await paginator.getPagination());
        this.store.set('res.metadata', paginator.getMetadata());

        this.logger.log('Response metadata and pagination set successfully');

        return data;
    }
}
