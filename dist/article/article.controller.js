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
const common_1 = require("@nestjs/common");
const article_service_1 = require("./article.service");
const create_article_dto_1 = require("./dto/create-article.dto");
const validate_object_id_pipes_1 = require("../shared/pipes/validate-object-id.pipes");
let ArticleController = class ArticleController {
    constructor(articleService) {
        this.articleService = articleService;
    }
    getArticle(res, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.articleService.getArticle(id);
            if (!article) {
                throw new common_1.NotFoundException('Article does not exist!');
            }
            return res.status(common_1.HttpStatus.OK).json(article);
        });
    }
    addArticle(res, createArticleDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const newArticle = yield this.articleService.addArticle(createArticleDTO);
            return res.status(common_1.HttpStatus.OK).json({
                message: 'Article added successfully!',
                article: newArticle,
            });
        });
    }
};
__decorate([
    common_1.Get('get/:id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getArticle", null);
__decorate([
    common_1.Post('add'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_article_dto_1.CreateArticleDTO]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "addArticle", null);
ArticleController = __decorate([
    common_1.Controller('article'),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
exports.ArticleController = ArticleController;
//# sourceMappingURL=article.controller.js.map