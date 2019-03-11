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

<<<<<<< HEAD
  @Get('/:id')
=======
  @Get('get/:id')
>>>>>>> dd7ede94c65490c2a498843e37e535289a36894a
  async getArticle(@Res() res, @Param('id', new ValidateObjectId()) id) {
    const article = await this.articleService.getArticle(id);
    if (!article) {
      throw new NotFoundException('Article does not exist!');
    }
    return res.status(HttpStatus.OK).json(article);
  }

<<<<<<< HEAD
  @Post()
=======
  @Post('add')
>>>>>>> dd7ede94c65490c2a498843e37e535289a36894a
  async addArticle(@Res() res, @Body() createArticleDTO: CreateArticleDTO) {
    const newArticle = await this.articleService.addArticle(createArticleDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Article added successfully!',
      article: newArticle,
    });
  }
}
