"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ArticleSchema = new mongoose.Schema({
    url: String,
    metadata: Object,
    HTML: Object,
    fetching: Boolean,
    completed: Boolean,
});
//# sourceMappingURL=article.schema.js.map