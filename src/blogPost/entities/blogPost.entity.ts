import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @OneToMany(() => Comment, (comment) => comment.blogPost, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comments: Relation<Comment[]>;

  @ManyToOne(() => User, (user) => user.blogPosts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  public user: Relation<User>;

  @Column()
  @Index()
  public userId: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    onUpdate: 'now()',
    nullable: true,
  })
  updatedAt: Date;
}
