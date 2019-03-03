import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  id: String,
  link: String,
  metadata: {},
  HTMLData: String,
  fetching: Boolean,
});
