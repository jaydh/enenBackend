import { Document } from 'mongoose';
import { UserArticle } from './userArticle.interface';
export interface User extends Document {
    readonly email: string;
    readonly articles?: UserArticle[];
    readonly password?: string;
    readonly passwordHash?: string;
    readonly _id: string;
}
