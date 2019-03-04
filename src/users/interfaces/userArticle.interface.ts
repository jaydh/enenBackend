import { Document } from 'mongoose';

export interface UserArticle extends Document {
  readonly id: string;
  readonly addedAt: Date;
  readonly completedOn?: Date;
  readonly bookmark?: string;
  readonly progress?: number;
}
