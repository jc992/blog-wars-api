import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, genSalt } from 'bcrypt';

import { User } from './entities/user.entity';
import { InsertResult, Repository } from 'typeorm';
import { RegistrationDto } from '../auth/dto/register.dto';
import { LoginDto } from '../auth/dto/login.dto';

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

  getUserById(id: number): Promise<User> {
    return this.repo.findOneBy({ id });
  }

  async getByUsername({ username, password }: LoginDto): Promise<User> {
    const user = await this.repo.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      //TODO: if no user throw
      return null;
    }

    const computedHash = await hash(password, user.salt);

    if (computedHash !== user.hash) {
      // TODO: throw
      return null;
    }
    return user;
  }

  private getRandomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
