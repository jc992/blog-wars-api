import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'Content required' })
  content: string;

  @IsNotEmpty({ message: 'User Id required' })
  userId: number;

  @IsNotEmpty({ message: 'Blog Post Id required' })
  blogPostId: number;

  constructor(content: string, userId: number, blogPostId: number) {
    this.content = content;
    this.userId = userId;
    this.blogPostId = blogPostId;
  }
}
