import { Comment } from "../entities/comment.entity";

export class CommentModel {
  username: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(comment: Comment) {
    this.username = comment.user.username;
    this.content = comment.content;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
  }
}
