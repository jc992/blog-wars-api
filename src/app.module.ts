import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BlogPostModule } from './blog-post/blog-post.module';
import { CommentModule } from './comment/comment.module';
import { typeOrmConfig } from './database/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    AuthModule,
    BlogPostModule,
    CommentModule,
    TypeOrmModule.forRoot(typeOrmConfig.getBaseTypeOrmConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
