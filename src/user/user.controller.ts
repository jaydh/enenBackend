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

  @Post('save/')
  async saveArticle(
    @Res() res,
    @Usr() user: User,
    @Body() body: { url: string },
  ) {
    const article = await this.userService.saveArticle(body, user);
    return res.status(HttpStatus.OK).json(article);
  }

  @Get('data')
  async getUserData(@Usr() user: User, @Res() res) {
    return res.status(HttpStatus.OK).json(user);
  }
}
