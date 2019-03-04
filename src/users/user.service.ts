import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Article') private readonly userModel: Model<User>,
  ) {}

  async getUser(id): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await this.userModel(createUserDTO);
    return newUser.save();
  }
}
