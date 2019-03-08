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
const article_parser_1 = require("./helpers/article-parser");
let ArticleService = class ArticleService {
    constructor(articleModel) {
        this.articleModel = articleModel;
    }
    getArticle(articleID) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.articleModel.findById(articleID).exec();
            return article;
        });
    }
    getArticleByUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.articleModel.findOne({ url }).exec();
            return article;
        });
    }
    addArticle(createArticleDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            let article = yield this.articleModel
                .findOne({
                url: createArticleDTO.url,
            })
                .exec();
            if (!article) {
                article = yield this.articleModel(createArticleDTO);
                yield article.save();
                this.parseArticle(article._id);
            }
            return article;
        });
    }
    parseArticle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.articleModel.findById(id);
            article.fetching = true;
            yield article.save();
            const { HTML, metadata } = yield article_parser_1.parseHTML(article.url);
            article.HTML = HTML;
            article.metadata = metadata;
            article.fetching = false;
            return article.save();
        });
    }
};
ArticleService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Article')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map