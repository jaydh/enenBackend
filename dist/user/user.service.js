"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const article_service_1 = require("../article/article.service");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userModel, articleService) {
        this.userModel = userModel;
        this.articleService = articleService;
        this.saltRounds = 10;
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findById(id).exec();
            return user;
        });
    }
    getUserArticles(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return user.articles;
        });
    }
    addUser(createUserDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.userModel(createUserDTO);
            newUser.passwordHash = yield this.getHash(newUser.password);
            newUser.password = undefined;
            return newUser.save();
        });
    }
    findOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ email }).exec();
            return user;
        });
    }
    saveArticle(body, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = yield body;
            const now = new Date().getTime();
            const userM = yield this.userModel.findById(user._id).exec();
            let article = yield this.articleService.getArticleByUrl(url);
            if (!article) {
                article = yield this.articleService.addArticle({ url });
                yield this.articleService.parseArticle(article._id);
            }
            if (user && !this.articleExists(userM, article._id)) {
                userM.articles.push({ id: article._id, addedAt: now });
                userM.save();
            }
            return article;
        });
    }
    deleteArticle(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userM = yield this.userModel.findById(user._id).exec();
            userM.articles = userM.articles.filter((a) => {
                return !a.id.equals(id);
            });
            return userM.save();
        });
    }
    toggleArticleCompleted(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userM = yield this.userModel.findById(user._id).exec();
            const index = userM.articles.findIndex((a) => a.id.equals(id));
            const completedOn = userM.articles[index].completedOn;
            userM.articles[index].completedOn = completedOn ? undefined : new Date();
            userM.markModified('articles');
            return userM.save();
        });
    }
    setBookmark(id, bookmark, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userM = yield this.userModel.findById(user._id).exec();
            const index = userM.articles.findIndex((a) => a.id.equals(id));
            userM.articles[index].bookmark = bookmark;
            userM.markModified('articles');
            userM.save();
        });
    }
    setProgress(id, progress, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userM = yield this.userModel.findById(user._id).exec();
            const index = userM.articles.findIndex((a) => a.id.equals(id));
            userM.articles[index].progress = progress;
            userM.markModified('articles');
            userM.save();
        });
    }
    articleExists(user, id) {
        return (user.articles.find((t) => id.equals(t.id)) !== undefined);
    }
    getHash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.hash(password, this.saltRounds);
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('User')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, article_service_1.ArticleService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map