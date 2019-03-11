import {
  Controller,
  HttpStatus,
  Response,
  Param,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserPayload } from '../user/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Response() res, @Body() userPayload: UserPayload) {
    const result = await this.authService.register(userPayload);
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

  @Get('token/:token')
  public async validateToken(@Response() res, @Param('token') token) {
    const isValid = await this.authService.validateToken(token);
    return token
      ? res.status(HttpStatus.OK).json(isValid)
      : res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Invalid Credentials',
        });
  }
}
