import { Document, ObjectId } from 'mongoose';

export interface UserArticle extends Document {
  readonly id: ObjectId;
  readonly addedAt: Date;
  readonly completedOn?: Date;
  readonly bookmark?: string;
  readonly progress?: number;
}
