import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  post(@Body() createCommentDto: CommentDto) {
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
