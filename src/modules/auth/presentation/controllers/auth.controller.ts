import { Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginUseCase } from '../../domain/useCases';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthUser } from 'src/shared/app/decorators';
import { User } from 'src/modules/users/domain/entities';
import { LocalAuth, Protected } from '../decorators';
import dayjs from 'dayjs';
import { Serializer } from 'src/shared/serializer';
import { UserSerializer } from 'src/modules/users/presentation/serializers';

@Controller({ path: 'auth' })
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly configService: ConfigService,
    ) {}

    @Post('login')
    @HttpCode(HttpStatus.CREATED)
    @LocalAuth()
    async login(@AuthUser() user: User, @Res({ passthrough: true }) res: Response) {
        const { accessToken, exp } = await this.loginUseCase.handle({ user });

        res.cookie('accessToken', accessToken, {
            expires: dayjs.unix(exp).toDate(),
            httpOnly: true,
            secure: this.configService.getOrThrow<boolean>('cookie.secure'),
            sameSite: this.configService.getOrThrow('cookie.sameSite'),
            path: `${this.configService.getOrThrow('server.prefix')}`,
        });

        return await Serializer(user, UserSerializer);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @Protected()
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('accessToken', {
            path: `${this.configService.getOrThrow('server.prefix')}`,
        });

        return { message: 'Logout successfully' };
    }

    @Get('me')
    @HttpCode(HttpStatus.OK)
    @Protected()
    async me(@AuthUser() user: User) {
        return await Serializer(user, UserSerializer);
    }
}
