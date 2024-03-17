import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogPostDto } from './createBlogPost.dto';

export class UpdateBlogPostDto extends PartialType(CreateBlogPostDto) {}
