import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { BlogPost } from '../../blog-post/entities/blogPost.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
@Index(['username'], { unique: true })
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  hash: string;

  @Column()
  salt: string;

  @OneToMany(() => BlogPost, (post) => post.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  blogPosts: Relation<BlogPost[]>;

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comments: Relation<Comment[]>;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    onUpdate: 'now()',
    nullable: true,
  })
  updatedAt: Date;
}
