import { Document } from 'mongoose';

export interface Article extends Document {
  readonly url: string;
  readonly metadata?: {};
  readonly HTML?: {};
  readonly fetching?: boolean;
  readonly _id: string;
}
