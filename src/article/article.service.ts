import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './interfaces/article.interface';
import { CreateArticleDTO } from './dto/create-article.dto';
import { parseHTML } from './helpers/article-parser';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}

  async getArticle(articleID: string): Promise<Article> {
    const article = await this.articleModel.findById(articleID).exec();
    return article;
  }

  async getArticleByUrl(url: string): Promise<Article> {
    const article = await this.articleModel.findOne({ url }).exec();
    return article;
  }

  async addArticle(createArticleDTO: CreateArticleDTO): Promise<Article> {
    let article = await this.articleModel
      .findOne({
        url: createArticleDTO.url,
      })
      .exec();

    // Create article if not found in database
    if (!article) {
      article = await this.articleModel(createArticleDTO);
      await article.save();
      // Intentionally not waiting for parse to return article id to user
      this.parseArticle(article._id);
    }
    return article;
  }
  async parseArticle(id: string): Promise<Article> {
    const article = await this.articleModel.findById(id);
    article.fetching = true;
    await article.save();
    const { HTML, metadata } = await parseHTML(article.url);
    article.HTML = HTML;
    article.metadata = metadata;
    article.fetching = false;
    return article.save();
  }
}
