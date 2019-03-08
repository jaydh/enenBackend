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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    register(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.userService.findOneByEmail(userDTO.email);
            if (!user) {
                user = yield this.userService.addUser(user);
            }
            return this.createToken(user);
        });
    }
    signIn(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOneByEmail(login.email);
            const validAuth = user
                ? yield this.compareHash(login.password, user.passwordHash)
                : false;
            return validAuth ? this.createToken(user) : undefined;
        });
    }
    createToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const expiresIn = 3600;
            const accessToken = this.jwtService.sign({ email: user.email });
            return {
                expiresIn: 3600,
                accessToken,
            };
        });
    }
    validateUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.findOneByEmail(payload.email);
        });
    }
    compareHash(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.compare(password, hash);
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map