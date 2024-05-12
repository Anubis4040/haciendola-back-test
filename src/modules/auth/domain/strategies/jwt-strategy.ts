import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/users/domain/services';
import { IToken } from '../interfaces';
import { User } from 'src/modules/users/domain/entities';
import { AccessDeniedException } from '../exceptions';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
        private readonly config: ConfigService,
    ) {
        super({
            secretOrKey: config.get('jwt.secret'),
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT, ExtractJwt.fromAuthHeaderAsBearerToken()]),
        });
    }

    async validate(payload: IToken): Promise<any> {
        const { email } = payload;
        const user: User = await this.userService.findUserByEmailOrUserName(email);

        if (!user) {
            throw new AccessDeniedException();
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user;

        return rest;
    }

    private static extractJWT(req: Request): string | null {
        console.log(req.cookies);
        if (req.cookies && 'accessToken' in req.cookies) {
            return req.cookies.accessToken;
        }
        return null;
    }
}
