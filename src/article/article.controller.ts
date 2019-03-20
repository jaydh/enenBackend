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

  @Get('/id')
  async getArticleByID(@Query('id', new ValidateObjectId()) id) {
    const article = await this.articleService.getArticle(id);
    return article ? article : { message: 'Article does not exist!' };
  }

  @Get('/url')
  async getArticleByURL(@Query('url') url) {
    const article = await this.articleService.getArticleByUrl(url);
    return article ? article : { message: 'Article does not exist!' };
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
