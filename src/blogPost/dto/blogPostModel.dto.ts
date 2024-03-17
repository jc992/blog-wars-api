import { BlogPost } from '../entities/blogPost.entity';

export class BlogPostModel {
  id: number;
  userId: number;
  username: string;
  content: string;
  createdAt: Date;
  constructor(post: BlogPost) {
    this.id = post.id;
    this.userId = post.userId;
    this.username = post.user.username;
    this.content = post.content;
    this.createdAt = post.createdAt;
  }
}
