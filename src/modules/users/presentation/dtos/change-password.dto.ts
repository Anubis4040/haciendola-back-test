import { IsString } from 'class-validator';

export class ChangePasswordDto {
    @IsString()
    public password: string;
}
