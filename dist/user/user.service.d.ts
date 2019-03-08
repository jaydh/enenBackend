import { Model } from 'mongoose';
import { Article } from '../article/interfaces/article.interface';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { ArticleService } from '../article/article.service';
export declare class UserService {
    private readonly userModel;
    private readonly articleService;
    private saltRounds;
    constructor(userModel: Model<User>, articleService: ArticleService);
    getUser(id: any): Promise<User>;
    getUserArticles(user: User): Promise<any>;
    addUser(createUserDTO: CreateUserDTO): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    saveArticle(body: {
        url: string;
    }, user: User): Promise<Article>;
    deleteArticle(id: string, user: User): Promise<any>;
    toggleArticleCompleted(id: string, user: User): Promise<any>;
    setBookmark(id: string, bookmark: string, user: User): Promise<void>;
    setProgress(id: string, progress: number, user: User): Promise<void>;
    private articleExists;
    private getHash;
}
