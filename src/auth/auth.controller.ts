import {
  Controller,
  UseGuards,
  HttpStatus,
  Response,
  Request,
  Get,
  Post,
  Body,
  Put,
  NotFoundException,
  Res,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  public async register(@Response() res, @Body() createUserDTO: CreateUserDTO) {
    const result = await this.authService.register(createUserDTO);
    result
      ? res.status(HttpStatus.OK).json(result)
      : res.status(HttpStatus.BAD_REQUEST).json({ message: 'User exists' });
  }

  @Post('login')
  public async login(@Response() res, @Body() login: JwtPayload) {
    const token = await this.authService.signIn(login);
    return token
      ? res.status(HttpStatus.OK).json(token)
      : res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Invalid Credentials',
        });
  }
}
