import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, Logger, UnprocessableEntityException, ValidationError, ValidationPipe } from '@nestjs/common';
import { ErrorModelDto } from './shared/app/utils';
import { ConfigService } from '@nestjs/config';
import { IServerConfig, swaggerConfig } from './config';
import { SwaggerModule } from '@nestjs/swagger';
import { LoggerContext } from './shared/app/enums';
import cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    app.use(cookieParser());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            validationError: {
                target: false,
            },
            exceptionFactory: (errors: ValidationError[]) => {
                const validationModels: ErrorModelDto[] = errors.map((error) => {
                    return new ErrorModelDto(error);
                });

                return new UnprocessableEntityException(validationModels);
            },
        }),
    );

    const config = app.get(ConfigService);

    const { prefix, port, url } = config.getOrThrow<IServerConfig>('server');

    app.setGlobalPrefix(prefix);

    const document = SwaggerModule.createDocument(app, swaggerConfig());
    SwaggerModule.setup(`/${prefix}/swagger`, app, document);

    await app.listen(port, () => {
        Logger.log(`SERVER RUNNING IN ${url.api}:${port}${prefix}`, LoggerContext.BOOTSTRAP);
    });
}
bootstrap();
