import * as mongoose from 'mongoose';
import { UserArticle } from '../interfaces/userArticle.interface';

export const UserSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  passwordHash: String,
  articles: [mongoose.Schema.Types.Mixed],
});
