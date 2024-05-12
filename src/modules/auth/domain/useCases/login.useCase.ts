import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/modules/users/domain/entities';
import { AuthService } from '../services';

declare interface LoginProps {
    user: User;
}

@Injectable()
export class LoginUseCase {
    private readonly logger = new Logger(LoginUseCase.name);

    constructor(private readonly authService: AuthService) {}

    async handle({ user }: LoginProps) {
        this.logger.log('Creating token...');
        const { accessToken, exp } = await this.authService.createToken(user);
        this.logger.log('Token created successfully!');

        return { accessToken, exp };
    }
}
