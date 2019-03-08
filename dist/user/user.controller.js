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
const user_service_1 = require("./user.service");
const passport_1 = require("@nestjs/passport");
const user_decorator_1 = require("../shared/decorators/user.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    saveArticle(res, user, body) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(body);
            const article = yield this.userService.saveArticle(body, user);
            return res.status(common_1.HttpStatus.OK).json(article);
        });
    }
    deleteArticle(res, user, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.userService.deleteArticle(body.id, user);
            return res.status(common_1.HttpStatus.OK).json(article);
        });
    }
    toggleArticleCompleted(res, user, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return res
                .status(common_1.HttpStatus.OK)
                .json(yield this.userService.toggleArticleCompleted(body.id, user));
        });
    }
    setBookmark(res, user, body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userService.setBookmark(body.id, body.bookmark, user);
            return res.status(common_1.HttpStatus.OK);
        });
    }
    setProgress(res, user, body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userService.setProgress(body.id, body.progress, user);
            return res.status(common_1.HttpStatus.OK);
        });
    }
    getUserData(user, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(common_1.HttpStatus.OK).json(user);
        });
    }
    getUserArticles(user, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res
                .status(common_1.HttpStatus.OK)
                .json(yield this.userService.getUserArticles(user));
        });
    }
};
__decorate([
    common_1.Post('save'),
    __param(0, common_1.Res()),
    __param(1, user_decorator_1.Usr()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "saveArticle", null);
__decorate([
    common_1.Post('delete'),
    __param(0, common_1.Res()),
    __param(1, user_decorator_1.Usr()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteArticle", null);
__decorate([
    common_1.Post('complete'),
    __param(0, common_1.Res()),
    __param(1, user_decorator_1.Usr()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "toggleArticleCompleted", null);
__decorate([
    common_1.Post('bookmark'),
    __param(0, common_1.Res()),
    __param(1, user_decorator_1.Usr()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setBookmark", null);
__decorate([
    common_1.Post('progress'),
    __param(0, common_1.Res()),
    __param(1, user_decorator_1.Usr()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setProgress", null);
__decorate([
    common_1.Get('data'),
    __param(0, user_decorator_1.Usr()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserData", null);
__decorate([
    common_1.Get('articles'),
    __param(0, user_decorator_1.Usr()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserArticles", null);
UserController = __decorate([
    common_1.Controller('user'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map