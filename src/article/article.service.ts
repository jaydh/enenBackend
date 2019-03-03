import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './interfaces/article.interface';
import { CreatePostDTO } from './dto/create-post.dto';

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
    const post = await this.articleModel.findById(articleID).exec();
    return post;
  }

  async addArticle(createPostDTO: CreatePostDTO): Promise<Article> {
    const newPost = await this.articleModel(createPostDTO);
    return newPost.save();
  }
}
