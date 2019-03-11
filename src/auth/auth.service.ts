import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtToken } from './interfaces/jwt-token.interface';
import { User, UserPayload } from '../user/interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(userPayload: UserPayload) {
    const user = await this.userService.addUser(userPayload);
    return user ? this.createToken(user) : undefined;
  }

  async signIn(login: JwtPayload): Promise<JwtToken | undefined> {
    const user = await this.userService.getUserByUsername(login.userName);
    const validAuth = user
      ? await this.compareHash(login.password, user.passwordHash)
      : false;
    return validAuth ? this.createToken(user) : undefined;
  }

  async createToken(user: User): Promise<JwtToken> {
    const accessToken = this.jwtService.sign({ userName: user.userName });
    return {
      userName: user.userName,
      email: user.email,
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateToken(tokenString: string): Promise<any> {
    return this.jwtService.verifyAsync(tokenString);
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.getUserByUsername(payload.userName);
  }

  private async compareHash(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
