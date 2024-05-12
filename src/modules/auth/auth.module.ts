import { Module } from '@nestjs/common';
import { UserModule } from '../users';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, LocalStrategy } from './domain/strategies';
import { AuthService } from './domain/services';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginUseCase } from './domain/useCases';
import { AuthController } from './presentation/controllers';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.getOrThrow<string>('jwt.secret'),
                signOptions: { expiresIn: config.getOrThrow<string>('jwt.expires') },
            }),
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [LocalStrategy, JwtStrategy, AuthService, LoginUseCase],
})
export class AuthModule {}
