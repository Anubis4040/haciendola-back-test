import { Injectable } from '@nestjs/common';
import { EncodeService, UserService } from 'src/modules/users/domain/services';
import { BadCredentialsException } from '../exceptions';
import { User } from 'src/modules/users/domain/entities';
import { IToken } from '../interfaces';
import { v4 as uuidV4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly encodeService: EncodeService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(value: string, password: string): Promise<any> {
        const user = await this.userService.findUserByEmailOrUserName(value);

        if (user) {
            const validatePassword = await this.encodeService.comparePassword(password, user.password);

            if (validatePassword) {
                return user;
            }
        }

        throw new BadCredentialsException();
    }

    async createToken(user: User) {
        const payload: IToken = {
            id: uuidV4(),
            sub: user.id,
            email: user.email,
        };

        const accessToken: string = this.jwtService.sign(payload);

        const { exp } = this.jwtService.decode(accessToken);

        return { user, accessToken, exp };
    }
}
