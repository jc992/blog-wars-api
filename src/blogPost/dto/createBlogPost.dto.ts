import { IsNotEmpty } from 'class-validator';

export class CreateBlogPostDto {
  @IsNotEmpty({ message: 'Content required' })
  content: string;

  constructor(content: string) {
    this.content = content;
  }
}
