import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  post(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  get(@Query('userId') userId?: string, @Query('blogPostId') blogPostId?: string) {
    if (userId) {
      return this.commentService.findByUserId(+userId);
    }

    if (blogPostId) {
      return this.commentService.findByBlogPostId(+blogPostId);
    }

    throw new HttpException('userId or blogPostId necessary as query string param for request', HttpStatus.BAD_REQUEST);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
