import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BlogPostService } from './blogPost.service';
import { CreateBlogPostDto } from './dto/createBlogPost.dto';
import { UpdateBlogPostDto } from './dto/updateBlogPost.dto';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';

@Controller('blogPost')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBlogPostDto: CreateBlogPostDto) {
    return this.blogPostService.create(createBlogPostDto);
  }

  @Get()
  findAll() {
    return this.blogPostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogPostService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
  ) {
    return this.blogPostService.update(+id, updateBlogPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogPostService.remove(+id);
  }
}
