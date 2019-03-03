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
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('get')
  async getArticles(@Res() res) {
    const posts = await this.articleService.getArticles();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Get('get/:id')
  async getArticle(
    @Res() res,
    @Param('articleID', new ValidateObjectId()) articleID,
  ) {
    const article = await this.articleService.getArticle(articleID);
    if (!article) {
      throw new NotFoundException('Article does not exist!');
    }
    return res.status(HttpStatus.OK).json(article);
  }

  @Post('/add')
  async addArticle(@Res() res, @Body() createPostDTO: CreatePostDTO) {
    const newArticle = await this.articleService.addArticle(createPostDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Article added successfully!',
      article: newArticle,
    });
  }
}
