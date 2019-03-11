import {
  Controller,
  Get,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDTO } from './dto/create-article.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('/:id')
  async getArticle(@Param('id', new ValidateObjectId()) id) {
    const article = await this.articleService.getArticle(id);
    if (!article) {
      throw new NotFoundException('Article does not exist!');
    }
    return article;
  }

  @Post()
  async addArticle(@Body() createArticleDTO: CreateArticleDTO) {
    const newArticle = await this.articleService.addArticle(createArticleDTO);
    return {
      message: 'Article added successfully!',
      article: newArticle,
    };
  }
}
