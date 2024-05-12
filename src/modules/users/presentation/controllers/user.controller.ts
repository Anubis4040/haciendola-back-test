import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetOneUserUseCase, ListUsersUseCase, SaveUserUseCase } from '../../domain/useCases';
import { Serializer } from 'src/shared/serializer';
import { SaveUserDto } from '../dtos';
import { UserSerializer } from '../serializers';
import { Criteria, Filter, Pagination, Sort, Uris } from 'src/shared/paginator/decorators';
import { UserFilter, UserSort } from '../criterias';
import { PaginationFilter } from 'src/shared/paginator/filters';
import { CriteriaBuilder, IUris } from 'src/shared/paginator';

@ApiTags('Users')
@Controller({ path: 'users' })
export class UserController {
    constructor(
        private readonly saveUserUseCase: SaveUserUseCase,
        private readonly getOneUserUseCase: GetOneUserUseCase,
        private readonly listUsersUseCase: ListUsersUseCase,
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
}
