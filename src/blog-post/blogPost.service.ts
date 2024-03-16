import { HttpException, HttpStatus, Injectable, NotImplementedException } from '@nestjs/common';
import { CreateBlogPostDto } from './dto/createBlogPost.dto';
import { UpdateBlogPostDto } from './dto/updateBlogPost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from './entities/blogPost.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserService } from '../user/user.service';
import { EncryptionService } from '../encryption/encryption.service';
import { BlogPostModel } from './dto/blogPostModel.dto';

@Injectable()
export class BlogPostService {
  constructor(
    private userService: UserService,
    private encryptionService: EncryptionService,
    @InjectRepository(BlogPost) private repo: Repository<BlogPost>,
  ) {}
  async create({ userId, content }: CreateBlogPostDto): Promise<any> {
    // TODO: add verification to check if jwt token is generated by this same user
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    const encryptedContent = await this.encryptionService.encrypt(content);
    return this.repo.insert({
      content: encryptedContent,
      userId: userId,
    });
  }

  async findAll(): Promise<BlogPostModel[]> {
    const posts = await this.repo.find();
    return Promise.all(posts.map(async (p) => new BlogPostModel(await this.decryptPost(p))));
  }

  async findById(id: number): Promise<BlogPostModel> {
    const post = await this.repo.findOneBy({ id });
    if (!post) {
      throw new HttpException('blog post not found', HttpStatus.NOT_FOUND);
    }
    return new BlogPostModel(await this.decryptPost(post));
  }

  async findByUserId(userId: number): Promise<BlogPostModel[]> {
    const posts = await this.repo.findBy({ userId });
    return Promise.all(posts.map(async (p) => new BlogPostModel(await this.decryptPost(p))));
  }

  private async decryptPost(post: BlogPost): Promise<BlogPost> {
    const decryptedContent = await this.encryptionService.decrypt(post.content);
    return {
      ...post,
      content: decryptedContent,
    };
  }

  async update(id: number, dto: UpdateBlogPostDto): Promise<UpdateResult> {
    // TODO: add verification to check if jwt token is generated by this same user trying to update the post
    await this.findById(id);
    const newEncryptedContent = await this.encryptionService.encrypt(dto.content);
    return this.repo.update(id, { content: newEncryptedContent });
  }

  async remove(id: number): Promise<DeleteResult> {
    // TODO: add verification to check if jwt token is generated by this same user trying to delete the post
    await this.findById(id);
    return this.repo.delete(id);
  }
}
