import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories';
import { EncodeService } from '../services';
import { ChangePasswordDto } from '../../presentation/dtos/change-password.dto';

@Injectable()
export class ChangePasswordUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly encodeService: EncodeService,
    ) {}

    async handle(id: string, data: ChangePasswordDto) {
        const foundUser = await this.userRepository.getOne(id);
        foundUser.password = await this.encodeService.encryptPassword(data.password);
        return await this.userRepository.save(foundUser);
    }
}
