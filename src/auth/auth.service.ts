import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegistrationDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { AccessTokenDto } from './dto/accessToken.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async login(dto: LoginDto): Promise<AccessTokenDto> {
    try {
      const isSignatureValid = await this.isPasswordVerifiedForLogin(dto);
      if (isSignatureValid) {
        return this.authenticateUser(dto);
      }
    } catch (e) {
      return new AccessTokenDto('', e.message, e.response.error);
    }
  }

  async register(dto: RegistrationDto): Promise<boolean> {
    if (!this.isPasswordVerifiedForRegistration(dto)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'PASSWORD_MISMATCH',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userInsertResult = await this.userService.create(dto);
    return !!userInsertResult;
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    return this.userService.getByUsername({ username, password });
  }

  // TODO: better name ?
  private isPasswordVerifiedForRegistration(dto: RegistrationDto): boolean {
    return dto.password === dto.passwordVerification;
  }

  // TODO: better name ?
  private async isPasswordVerifiedForLogin(dto: LoginDto): Promise<boolean> {
    const user = await this.userService.getByUsername(dto);
    return !!user;
  }

  private authenticateUser(dto: LoginDto): AccessTokenDto {
    return new AccessTokenDto(
      this.jwtService.sign(dto, {
        expiresIn: '182d',
      }),
    );
  }
}
