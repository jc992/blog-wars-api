import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BlogPostService } from './blogPost.service';
import { CreateBlogPostDto } from './dto/createBlogPost.dto';
import { UpdateBlogPostDto } from './dto/updateBlogPost.dto';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { BlogPostModel } from './dto/blogPostModel.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('blogPost')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBlogPostDto: CreateBlogPostDto, @Req() { user }) {
    return this.blogPostService.create(createBlogPostDto, user.id);
  }

  @Get()
  async findAll(): Promise<BlogPostModel[]> {
    return this.blogPostService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BlogPostModel> {
    return this.blogPostService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('fromUser/:userId')
  async findByUser(@Param('userId') userId: string): Promise<BlogPostModel[]> {
    return this.blogPostService.findByUserId(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlogPostDto: UpdateBlogPostDto): Promise<UpdateResult> {
    return this.blogPostService.update(+id, updateBlogPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.blogPostService.remove(+id);
  }
}
