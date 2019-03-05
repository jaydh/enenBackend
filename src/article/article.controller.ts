import {
  Controller,
  Get,
  Res,
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

  @Get('get')
  async getArticles(@Res() res) {
    const posts = await this.articleService.getArticles();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Get('get/:id')
  async getArticle(@Res() res, @Param('id', new ValidateObjectId()) id) {
    const article = await this.articleService.getArticle(id);
    if (!article) {
      throw new NotFoundException('Article does not exist!');
    }
    return res.status(HttpStatus.OK).json(article);
  }

  @Post('add')
  async addArticle(@Res() res, @Body() createArticleDTO: CreateArticleDTO) {
    const newArticle = await this.articleService.addArticle(createArticleDTO);
    this.articleService.parseArticle(newArticle._id);
    return res.status(HttpStatus.OK).json({
      message: 'Article added successfully!',
      article: newArticle,
    });
  }
}
