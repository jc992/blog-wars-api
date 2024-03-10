import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/accessToken.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<AccessTokenDto> {
    return this.authService.login(dto);
  }

  @Post('register')
  async register(@Body() dto: RegistrationDto): Promise<boolean> {
    return this.authService.register(dto);
  }
}
