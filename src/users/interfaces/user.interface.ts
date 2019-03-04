import { Document } from 'mongoose';
import { UserArticle } from './userArticle.interface';

export interface User extends Document {
  readonly email: string;
  readonly articleIDs: UserArticle[];
}
