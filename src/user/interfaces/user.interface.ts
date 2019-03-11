import { Document } from 'mongoose';
import { UserArticle } from './userArticle.interface';

export interface User extends Document {
  readonly userName: string;
  readonly email?: string;
  readonly articles?: UserArticle[];
  readonly passwordHash: string;
  readonly _id: string;
}

export interface UserPayload {
  readonly userName: string;
  readonly password: string;
}
