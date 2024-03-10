import { IsNotEmpty } from 'class-validator';

export class CreateBlogPostDto {
  @IsNotEmpty({ message: 'Content required' })
  content: string;

  @IsNotEmpty({ message: 'User Id required' })
  userId: string;

  constructor(content: string, userId: string) {
    this.content = content;
    this.userId = userId;
  }
}
