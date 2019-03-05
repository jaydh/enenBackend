import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ArticleService } from '../article/article.service';
import { ArticleModule } from '../article/article.module';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
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
