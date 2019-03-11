import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserPayload } from '../user/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() userPayload: UserPayload) {
    const result = await this.authService.register(userPayload);
    return result ? result : { message: 'User exists' };
  }

  @Post('login')
  public async login(@Body() login: JwtPayload) {
    const token = await this.authService.signIn(login);
    return token
      ? token
      : {
          message: 'Invalid Credentials',
        };
  }

  @Get('token/:token')
  public async validateToken(@Param('token') token) {
    const isValid = await this.authService.validateToken(token);
    return token
      ? isValid
      : {
          message: 'Invalid Credentials',
        };
  }
}
