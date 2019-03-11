import {
  Controller,
  Get,
  Param,
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
  async saveArticle(@Usr() user: User, @Body() body: { url: string }) {
    const article = await this.userService.saveArticle(body, user);
    return article;
  }

  @Post('connectEmail')
  async connectEmail(@Usr() user: User, @Body() body: { email: string }) {
    const userM = await this.userService.setEmail(body.email, user);
    return userM ? 'Success' : 'Fail';
  }

  @Post('delete')
  async deleteArticle(@Usr() user: User, @Body() body: { id: string }) {
    const article = await this.userService.deleteArticle(body.id, user);
    return 'Success';
  }

  @Post('complete')
  async toggleArticleCompleted(
    @Usr() user: User,
    @Body() body: { id: string },
  ) {
    return await this.userService.toggleArticleCompleted(body.id, user);
  }

  @Post('bookmark')
  async setBookmark(
    @Usr() user: User,
    @Body() body: { id: string; bookmark: string },
  ) {
    await this.userService.setBookmark(body.id, body.bookmark, user);
    return 'Success';
  }

  @Post('progress')
  async setProgress(
    @Usr() user: User,
    @Body() body: { id: string; progress: number },
  ) {
    await this.userService.setProgress(body.id, body.progress, user);
    return 'Success';
  }

  @Get('data')
  async getUserData(@Usr() user: User) {
    return user;
  }

  @Get('articles')
  async getUserArticles(@Usr() user: User) {
    return await this.userService.getUserArticles(user);
  }
}
