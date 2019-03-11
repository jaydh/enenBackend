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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from '../shared/decorators/user.decorator';
import { User } from '../user/interfaces/user.interface';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private userService: UserService) {}

  @Post('save')
  async saveArticle(
    @Res() res,
    @Usr() user: User,
    @Body() body: { url: string },
  ) {
    const article = await this.userService.saveArticle(body, user);
    return res.status(HttpStatus.OK).json(article);
  }

  @Post('connectEmail')
  async connectEmail(
    @Res() res,
    @Usr() user: User,
    @Body() body: { email: string },
  ) {
    const userM = await this.userService.setEmail(body.email, user);
    return userM
      ? res.status(HttpStatus.OK)
      : res.status(HttpStatus.BAD_REQUEST);
  }

  @Post('delete')
  async deleteArticle(
    @Res() res,
    @Usr() user: User,
    @Body() body: { id: string },
  ) {
    const article = await this.userService.deleteArticle(body.id, user);
    return res.status(HttpStatus.OK).json(article);
  }

  @Post('complete')
  async toggleArticleCompleted(
    @Res() res,
    @Usr() user: User,
    @Body() body: { id: string },
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.toggleArticleCompleted(body.id, user));
  }

  @Post('bookmark')
  async setBookmark(
    @Res() res,
    @Usr() user: User,
    @Body() body: { id: string; bookmark: string },
  ) {
    await this.userService.setBookmark(body.id, body.bookmark, user);
    return res.status(HttpStatus.OK);
  }

  @Post('progress')
  async setProgress(
    @Res() res,
    @Usr() user: User,
    @Body() body: { id: string; progress: number },
  ) {
    await this.userService.setProgress(body.id, body.progress, user);
    return res.status(HttpStatus.OK);
  }

  @Get('data')
  async getUserData(@Usr() user: User, @Res() res) {
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('articles')
  async getUserArticles(@Usr() user: User, @Res() res) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.getUserArticles(user));
  }
}
