import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SaveUserDto {
    @ApiProperty({
        description: 'First name of the user',
        example: 'John',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    public firstName: string;

    @ApiProperty({
        description: 'Last name of the user',
        example: 'Doe',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    public lastName: string;

    @ApiProperty({
        description: 'UserName of the user',
        example: 'johndoe',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    public userName: string;

    @ApiProperty({
        description: 'Email of the user',
        example: 'johndoe@mail.com',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    public email: string;

    @ApiProperty({
        description: 'Password of the user',
        example: '123456',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    public password: string;
}
