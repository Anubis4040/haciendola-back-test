import { Module } from '@nestjs/common';
import { EncodeService, UserService } from './domain/services';
import { UserRepository } from './infrastructure/repositories';
import { GetOneUserUseCase, ListUsersUseCase, SaveUserUseCase } from './domain/useCases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './infrastructure/schemas';
import { UserController } from './presentation/controllers';
import { RecoverPasswordUseCase } from './domain/useCases/recover-password.useCase';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserSchema]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.getOrThrow<string>('jwt.secret'),
            }),
        }),
    ],
    controllers: [UserController],
    providers: [UserRepository, UserService, EncodeService, SaveUserUseCase, GetOneUserUseCase, ListUsersUseCase, RecoverPasswordUseCase],
    exports: [UserService, EncodeService],
})
export class UserModule {}
