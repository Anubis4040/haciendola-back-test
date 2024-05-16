import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories';
import { UserService } from '../services';

@Injectable()
export class RecoverPasswordUseCase {
    constructor(
        private userRepository: UserRepository,
        private userService: UserService,
    ) {}

    async handle(data: any) {
        const foundUser = await this.userRepository.getOneBy({ where: { email: data.email } }, { initThrow: false });
        if (foundUser) {
            await this.userService.sendRecoverEmail(foundUser);
            return { message: 'Email sent' };
        } else {
            return { message: 'User not found' };
        }
    }
}
