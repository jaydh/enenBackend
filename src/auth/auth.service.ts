import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectModel, PassportLocalModel } from 'mongoose';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtToken } from './interfaces/jwt-token.interface';
import { User } from '../user/interfaces/user.interface';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(userDTO: CreateUserDTO) {
    let user = await this.userService.findOneByEmail(userDTO.email);
    if (!user) {
      user = await this.userService.addUser(user);
    }
    return this.createToken(user);
  }

  async signIn(login: JwtPayload): Promise<JwtToken | undefined> {
    const user = await this.userService.findOneByEmail(login.email);
    const validAuth = user
      ? await this.compareHash(login.password, user.passwordHash)
      : false;
    return validAuth ? this.createToken(user) : undefined;
  }

  async createToken(user: User): Promise<JwtToken> {
    const expiresIn = 3600;
    const accessToken = this.jwtService.sign({ email: user.email });
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findOneByEmail(payload.email);
  }

  private async compareHash(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
