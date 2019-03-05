import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ArticleService } from '../article/article.service';
import { ArticleModule } from '../article/article.module';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtSecretKey } from '../keys';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: JwtSecretKey,
      signOptions: {
        expiresIn: 3600,
      },
    }),

    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ArticleModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
