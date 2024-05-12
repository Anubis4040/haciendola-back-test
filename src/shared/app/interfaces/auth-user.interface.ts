import { Request } from 'express';

export interface IAuthUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
}

export type AuthRequest = Request & { user: IAuthUser };
