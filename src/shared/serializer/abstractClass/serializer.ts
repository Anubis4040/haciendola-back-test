import { BaseSerializer } from './base-serializer';
import dayjs from 'dayjs';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export abstract class Serializer<D = any> extends BaseSerializer<D> {
    @Expose()
    @ApiProperty({
        description: 'Unique identifier.',
        example: 'ed7902f7-0af6-44dd-b31e-b38448b57a9a',
    })
    public id: string;

    @Expose()
    @ApiProperty({
        description: 'Creation date.',
        example: dayjs().unix(),
    })
    public createdAt: Date | number;

    @Expose()
    @ApiProperty({
        description: 'Update date.',
        example: dayjs().unix(),
    })
    public updatedAt: Date | number;

    @Expose()
    @ApiProperty({
        description: 'Date when it was partially removed.',
        example: dayjs().unix(),
        nullable: true,
    })
    public deletedAt: Date | number | null;
}
