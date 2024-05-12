import { Module } from '@nestjs/common';
import { EncodeService, UserService } from './domain/services';
import { UserRepository } from './infrastructure/repositories';
import { GetOneUserUseCase, ListUsersUseCase, SaveUserUseCase } from './domain/useCases';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './infrastructure/schemas';
import { UserController } from './presentation/controllers';

@Module({
    imports: [TypeOrmModule.forFeature([UserSchema])],
    controllers: [UserController],
    providers: [UserRepository, UserService, EncodeService, SaveUserUseCase, GetOneUserUseCase, ListUsersUseCase],
    exports: [UserService, EncodeService],
})
export class UserModule {}
