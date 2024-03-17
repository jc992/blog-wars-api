import { IsNotEmpty } from 'class-validator';

export class CreateBlogPostDto {
  @IsNotEmpty({ message: 'Content required' })
  content: string;

  @IsNotEmpty({ message: 'User Id required' })
  userId: number;

  constructor(content: string, userId: number) {
    this.content = content;
    this.userId = userId;
  }
}
