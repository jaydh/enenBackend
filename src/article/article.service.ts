import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './interfaces/article.interface';
import { CreatePostDTO } from './dto/create-post.dto';
import { parseHTML } from './helpers/article-parser';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}

  async getArticles(): Promise<Article[]> {
    const posts = await this.articleModel.find().exec();
    return posts;
  }

  async getArticle(articleID): Promise<Article> {
    const article = await this.articleModel.findById(articleID).exec();
    return article;
  }

  async addArticle(createPostDTO: CreatePostDTO): Promise<Article> {
    const newArticle = await this.articleModel(createPostDTO);
    return newArticle.save();
  }
  async parseArticle(id: string): Promise<Article> {
    const article = await this.articleModel.findById(id);
    article.fetching = true;
    await article.save();
    article.HTML = await parseHTML(article.url);
    article.fetching = false;
    return article.save();
  }
}
