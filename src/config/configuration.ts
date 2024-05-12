import { IConfig } from './configuration.interface';

export default (): IConfig => ({
    server: {
        url: {
            api: process.env.API_URL,
            web: process.env.WEB_URL,
        },
        prefix: process.env.API_PREFIX,
        version: process.env.API_VERSION,
        port: parseInt(process.env.API_PORT, 10) || 8080,
        whiteList: process.env.CORS_WHITE_LIST.split(','),
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES,
    },
    database: {
        type: process.env.DB_TYPE as 'postgres' | 'mysql' | 'mariadb' | 'sqlite', // TODO: VALIDATE ENV
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        synchronize: process.env.DB_SYNC === 'true',
        migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
        logging: process.env.DB_LOGGING === 'true',
        subscribers: [`${process.cwd()}/dist/**/infrastructure/subscribers/*.subscriber{.ts,.js}`],
        autoLoadEntities: true,
    },
    encryption: {
        default: process.env.ENCRYPTION_DEFAULT as any, // TODO: VALIDATE ENV
        bcrypt: {
            type: 'bcrypt',
            saltRounds: 10,
            algorithm: 'HS512',
        },
    },
    pagination: {
        limit: process.env.PAGINATION_LIMIT as any, // TODO: VALIDATE ENV
    },
    cookie: {
        secure: process.env.COOKIE_SECURE === 'true', // TODO: VALIDATE ENV
        sameSite: process.env.COOKIE_SAME_SITE,
    },
});
