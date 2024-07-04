import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetOneUserUseCase, ListUsersUseCase, SaveUserUseCase, RecoverPasswordUseCase, ChangePasswordUseCase } from '../../domain/useCases';
import { Serializer } from 'src/shared/serializer';
import { SaveUserDto } from '../dtos';
import { UserSerializer } from '../serializers';
import { Criteria, Filter, Pagination, Sort, Uris } from 'src/shared/paginator/decorators';
import { UserFilter, UserSort } from '../criterias';
import { PaginationFilter } from 'src/shared/paginator/filters';
import { CriteriaBuilder, IUris } from 'src/shared/paginator';
import { PasswordTokenGuard } from '../guards/passwordToken.guard';
import { UserTokenId } from 'src/shared/app/decorators/user-token-id.decorator';
import { ChangePasswordDto } from '../dtos/change-password.dto';

@ApiTags('Users')
@Controller({ path: 'users' })
export class UserController {
    constructor(
        private readonly saveUserUseCase: SaveUserUseCase,
        private readonly getOneUserUseCase: GetOneUserUseCase,
        private readonly listUsersUseCase: ListUsersUseCase,
        private readonly recoverPasswordUseCase: RecoverPasswordUseCase,
        private readonly changePasswordUseCase: ChangePasswordUseCase,
    ) {}

    @Get()
    @Criteria()
    @HttpCode(HttpStatus.OK)
    async list(@Filter() filters: UserFilter, @Sort() sorts: UserSort, @Pagination() pagination: PaginationFilter, @Uris() uris: IUris) {
        const criteria = new CriteriaBuilder({ filters, sorts, pagination, uris });

        return await Serializer(await this.listUsersUseCase.handle({ criteria }), UserSerializer);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getOne(@Param('id') id: string) {
        return await Serializer(await this.getOneUserUseCase.handle({ id }), UserSerializer);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async save(@Body() data: SaveUserDto) {
        return await Serializer(await this.saveUserUseCase.handle({ data }), UserSerializer);
    }

    @Post('recover-password')
    @HttpCode(HttpStatus.OK)
    // TODO: agregar type al body
    async recoverPassword(@Body() data: any) {
        return await this.recoverPasswordUseCase.handle(data);
    }

    @UseGuards(PasswordTokenGuard)
    @Post('change-password')
    @HttpCode(HttpStatus.OK)
    async changePassword(@UserTokenId() id: string, @Body() data: ChangePasswordDto) {
        return await this.changePasswordUseCase.handle(id, data);
    }
}
