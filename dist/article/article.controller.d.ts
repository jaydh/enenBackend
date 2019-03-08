import { ArticleService } from './article.service';
import { CreateArticleDTO } from './dto/create-article.dto';
export declare class ArticleController {
    private articleService;
    constructor(articleService: ArticleService);
    getArticle(res: any, id: any): Promise<any>;
    addArticle(res: any, createArticleDTO: CreateArticleDTO): Promise<any>;
}
