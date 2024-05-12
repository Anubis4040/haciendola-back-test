import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories';

declare interface GetOneUserProps {
    id: string;
}

@Injectable()
export class GetOneUserUseCase {
    private readonly logger = new Logger(GetOneUserUseCase.name);
    constructor(private readonly repository: UserRepository) {}

    async handle({ id }: GetOneUserProps) {
        this.logger.log('Get user by username...');

        const user = await this.repository.getOne(id);

        this.logger.log('User found successfully!');

        return user;
    }
}
