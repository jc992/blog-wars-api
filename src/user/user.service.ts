import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, genSalt } from 'bcrypt';
import { User } from './entities/user.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { RegistrationDto } from '../auth/dto/register.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async create({ username, password, email }: RegistrationDto): Promise<InsertResult> {
    try {
      // TODO error handling
      const salt = await genSalt(this.getRandomNumber());
      const passwordHash = await hash(password, salt);
      return this.repo.insert({
        salt,
        hash: passwordHash,
        username,
        email,
      });
    } catch (e) {
      //TODO handle error
      console.log(e);
    }
  }

  async getUserById(id: number): Promise<User> {
    return this.repo.findOneBy({ id });
  }

  async getByUsername({ username, password }: LoginDto): Promise<User> {
    const user = await this.repo.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    const computedHash = await hash(password, user.salt);

    if (computedHash !== user.hash) {
      throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<UpdateResult> {
    // TODO: add verification to check if jwt token is generated by this same user trying to update the user object
    const user = await this.getUserById(id);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    const email = dto.email ? dto.email : user.email;
    const passwordHash = dto.password ? await hash(dto.password, user.salt) : user.hash;
    const username = dto.username ? dto.username : user.username;
    return this.repo.update(id, { email, hash: passwordHash, username });
  }

  async delete(id: number): Promise<DeleteResult> {
    // TODO: add verification to check if jwt token is generated by this same user trying to delete the user object
    const user = await this.getUserById(id);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    return this.repo.delete(id);
  }

  private getRandomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
