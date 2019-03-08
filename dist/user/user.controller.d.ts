import { UserService } from './user.service';
import { User } from '../user/interfaces/user.interface';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    saveArticle(res: any, user: User, body: {
        url: string;
    }): Promise<any>;
    deleteArticle(res: any, user: User, body: {
        id: string;
    }): Promise<any>;
    toggleArticleCompleted(res: any, user: User, body: {
        id: string;
    }): Promise<any>;
    setBookmark(res: any, user: User, body: {
        id: string;
        bookmark: string;
    }): Promise<any>;
    setProgress(res: any, user: User, body: {
        id: string;
        progress: number;
    }): Promise<any>;
    getUserData(user: User, res: any): Promise<any>;
    getUserArticles(user: User, res: any): Promise<any>;
}
