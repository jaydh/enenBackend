import { Document } from 'mongoose';

export interface Article extends Document {
  readonly id: string;
  readonly link: string;
  readonly metadata?: any;
  readonly HTMLData?: string;
  readonly fetching?: boolean;
}
