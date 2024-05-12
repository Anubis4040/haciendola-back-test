import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories';
import { User } from '../entities';
import { EncodeService, UserService } from '../services';
import { SaveUserDto } from '../../presentation/dtos';

declare interface SaveUserProps {
    data: SaveUserDto;
}

@Injectable()
export class SaveUserUseCase {
    private readonly logger = new Logger(SaveUserUseCase.name);

    constructor(
        private readonly userRepository: UserRepository,
        private readonly service: UserService,
        private readonly encodeService: EncodeService,
    ) {}

    async handle({ data }: SaveUserProps) {
        this.logger.log('Creating user...');

        this.logger.log('hashing password...');
        data.password = await this.encodeService.encryptPassword(data.password);
        this.logger.log('Password hashed successfully!');

        let user = new User(data);

        this.logger.log('Validating unique fields...');
        await this.service.validate(user);
        this.logger.log('Unique fields validated successfully!');

        user = await this.userRepository.save(user);
        this.logger.log('User created successfully!');

        return user;
    }
}
