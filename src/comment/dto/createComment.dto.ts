import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'Content required' })
  content: string;

  @IsNotEmpty({ message: 'Blog Post Id required' })
  blogPostId: number;

  constructor(content: string, blogPostId: number) {
    this.content = content;
    this.blogPostId = blogPostId;
  }
}
