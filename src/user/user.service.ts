import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from '../article/interfaces/article.interface';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { ArticleService } from '../article/article.service';
import { ObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private saltRounds = 10;
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly articleService: ArticleService,
  ) {}

  public async getUser(id): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  public async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = await this.userModel(createUserDTO);

    newUser.passwordHash = await this.getHash(newUser.password);
    // clear password as we don't persist passwords
    newUser.password = undefined;
    return newUser.save();
  }

  public async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  public async saveArticle(body: any): Promise<User> {
    const { url, uid } = await body;
    const user = await this.userModel.findById(uid).exec();

    let article = await this.articleService.getArticleByUrl(url);
    if (!article) {
      article = await this.articleService.addArticle({ url });
    }
    // No dupes
    if (user && !this.articleExists(user, article._id)) {
      user.articleIDs.push(article._id);
      user.save();
    }
    return user;
  }

  private articleExists(user: User, id: ObjectId): boolean {
    return (
      user.articleIDs.find((t: ObjectId) => t.toString() === id.toString()) !==
      undefined
    );
  }

  private async getHash(password: string | undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
}
