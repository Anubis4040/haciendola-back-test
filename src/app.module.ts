import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config';
import { UserModule } from './modules/users';
import { CommonModule } from './modules/common';
import { ResponseInterceptorProvider, SerializerInterceptorProvider } from './shared/app/providers';
import { ClsModule } from 'nestjs-cls';
import { AuthModule } from './modules/auth';
import { ProductModule } from './modules/products';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        // JwtModule.registerAsync({
        //     inject: [ConfigService],
        //     useFactory: (config: ConfigService) => ({
        //         secret: config.getOrThrow<string>('jwt.secret'),
        //         signOptions: { expiresIn: config.getOrThrow<string>('jwt.expires') },
        //     }),
        // }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'src', 'public'),
        }),
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: DatabaseConfig,
        }),
        ClsModule.forRoot({
            global: true,
            middleware: { mount: true },
        }),
        MailerModule.forRoot({
            transport: 'smtp://postmaster@sandboxd4bbf8e0c6a342fa9e449b1868d421f6.mailgun.org:2a52cb6dbe2dc10d035c6aab30bc067d-ed54d65c-d975edc3@smtp.mailgun.org:587',
            template: {
                dir: './src/templates',
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
            defaults: {
                from: '"nest-modules" <modules@nestjs.com>',
            },
        }),
        CommonModule,
        UserModule,
        ProductModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, ResponseInterceptorProvider, SerializerInterceptorProvider]
})
export class AppModule {}
