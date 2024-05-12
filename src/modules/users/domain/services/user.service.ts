import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories';
import { User } from '../entities';
import { UniqueService } from 'src/modules/common/domain/services';

@Injectable()
export class UserService {
    constructor(
        private readonly repository: UserRepository,
        private readonly uniqueService: UniqueService,
    ) {}

    async validate(entity: User): Promise<void> {
        void (await this.uniqueService.validate<User>({
            repository: UserRepository,
            validate: {
                email: entity.email,
                userName: entity.userName,
            },
            refValue: entity.id,
        }));
    }

    async findUserByEmailOrUserName(value: string): Promise<User> {
        return this.repository.findByEmailOrUserName(value);
    }
}
