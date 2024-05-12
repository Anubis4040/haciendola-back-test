import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config';
import { UserModule } from './modules/users';
import { CommonModule } from './modules/common';
import { ResponseInterceptorProvider, SerializerInterceptorProvider } from './shared/app/providers';
import { ClsModule } from 'nestjs-cls';
import { AuthModule } from './modules/auth';
import { ProductModule } from './modules/products';

@Module({
    imports: [
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
        CommonModule,
        UserModule,
        ProductModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, ResponseInterceptorProvider, SerializerInterceptorProvider],
})
export class AppModule {}
