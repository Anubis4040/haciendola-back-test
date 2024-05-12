import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = () => new DocumentBuilder().setTitle('API.').setDescription('API.').addBearerAuth().build();
