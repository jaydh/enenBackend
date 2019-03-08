"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    passwordHash: String,
    articles: [mongoose.Schema.Types.Mixed],
});
//# sourceMappingURL=user.schema.js.map