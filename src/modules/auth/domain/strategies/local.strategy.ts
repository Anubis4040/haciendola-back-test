import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'emailOrUserName' });
    }

    async validate(value: string, password: string): Promise<any> {
        return await this.authService.validateUser(value, password);
    }
}
