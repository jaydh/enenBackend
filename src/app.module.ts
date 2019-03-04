import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './article/article.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/articles', {
      useNewUrlParser: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/user', {
      useNewUrlParser: true,
    }),
    ArticleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
