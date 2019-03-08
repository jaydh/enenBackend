import { Model } from 'mongoose';
import { Article } from './interfaces/article.interface';
import { CreateArticleDTO } from './dto/create-article.dto';
export declare class ArticleService {
    private readonly articleModel;
    constructor(articleModel: Model<Article>);
    getArticle(articleID: string): Promise<Article>;
    getArticleByUrl(url: string): Promise<Article>;
    addArticle(createArticleDTO: CreateArticleDTO): Promise<Article>;
    parseArticle(id: string): Promise<Article>;
}
