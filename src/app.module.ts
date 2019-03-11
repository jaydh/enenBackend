import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/articles', {
      useNewUrlParser: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/user', {
      useNewUrlParser: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/auth', {
      useNewUrlParser: true,
    }),
    AuthModule,
    ArticleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
