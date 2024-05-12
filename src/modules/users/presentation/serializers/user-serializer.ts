import { ApiProperty } from '@nestjs/swagger';
import { Serializer } from 'src/shared/serializer/abstractClass/serializer';
import { User } from '../../domain/entities';
import { Expose } from 'class-transformer';

export class UserSerializer extends Serializer {
    @Expose()
    @ApiProperty({
        description: 'First name of the user',
        example: 'John',
    })
    public firstName: string;

    @Expose()
    @ApiProperty({
        description: 'Last name of the user',
        example: 'Doe',
    })
    public lastName: string;

    @Expose()
    @ApiProperty({
        description: 'Username of the user',
        example: 'johndoe',
    })
    public userName: string;

    @Expose()
    @ApiProperty({
        description: 'Email of the user',
        example: 'johndoe@mail.com',
    })
    public email: string;

    override async build(data: User): Promise<void> {
        super.build(data);
    }
}
