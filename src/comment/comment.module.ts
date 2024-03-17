import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { EncryptionModule } from '../encryption/encryption.module';
import { BlogPostModule } from '../blogPost/blogPost.module';
import { UserModule } from '../user/user.module';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), BlogPostModule, EncryptionModule, UserModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
