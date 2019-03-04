import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  url: String,
  metadata: Object,
  HTML: Object,
  fetching: Boolean,
});
