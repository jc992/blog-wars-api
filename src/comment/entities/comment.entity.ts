import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { BlogPost } from '../../blogPost/entities/blogPost.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  public user: Relation<User>;

  @Column()
  @Index()
  public userId: number;

  @ManyToOne(() => BlogPost, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'blogPostId' })
  public blogPost: Relation<BlogPost>;

  @Column()
  @Index()
  public blogPostId: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    onUpdate: 'now()',
    nullable: true,
  })
  updatedAt: Date;
}
