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
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get('get/:id')
  async getArticle(@Res() res, @Param('id', new ValidateObjectId()) id) {
    const user = await this.usersService.getUser(id);
    if (!user) {
      throw new NotFoundException('Article does not exist!');
    }
    return res.status(HttpStatus.OK).json(user);
  }

  @Post('/add')
  async addArticle(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    const newUser = await this.usersService.addUser(createUserDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Article added successfully!',
      user: newUser,
    });
  }
}
