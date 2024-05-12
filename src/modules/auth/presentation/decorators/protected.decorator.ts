import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from '../guards';

export function Protected() {
    return applyDecorators(UseGuards(JwtAuthGuard));
}
