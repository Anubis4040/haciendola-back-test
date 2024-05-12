export interface IConfig {
    server: IServerConfig;
    jwt: IJwtConfig;
    database: IDBConfig;
    encryption: IEncryptionConfig;
    pagination: IPaginationConfig;
    cookie: ICookieConfig;
}

export interface IUriConfig {
    api: string;
    web: string;
}

export interface IServerConfig {
    url: IUriConfig;
    prefix: string;
    version: string;
    port: number;
    whiteList: string[];
}

export interface IJwtConfig {
    secret: string;
    expires: string;
}

export interface IDBConfig {
    type: 'postgres' | 'mysql' | 'mariadb' | 'sqlite';
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    synchronize: boolean;
    migrationsRun: boolean;
    logging: boolean;
    subscribers: string[];
    autoLoadEntities?: boolean;
}

export interface IBCryptTypeConfig {
    type: string;
    saltRounds: number;
    algorithm: any;
}

export interface IEncryptionConfig {
    bcrypt: IBCryptTypeConfig;
    default: 'bcrypt';
}

export interface IPaginationConfig {
    limit: number;
}

export interface ICookieConfig {
    secure: boolean;
    sameSite: string;
}
