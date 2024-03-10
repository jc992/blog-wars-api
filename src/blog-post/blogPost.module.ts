import { Module } from '@nestjs/common';
import { BlogPostService } from './blogPost.service';
import { BlogPostController } from './blogPost.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './entities/blogPost.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost]), UserModule, AuthModule],
  controllers: [BlogPostController],
  providers: [BlogPostService],
  exports: [BlogPostService],
})
export class BlogPostModule {}
