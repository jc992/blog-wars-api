import { IsNotEmpty } from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty({ message: 'Username required' })
  username: string;

  @IsNotEmpty({ message: 'Email required' })
  email: string;

  @IsNotEmpty({ message: 'Password required' })
  password: string;

  @IsNotEmpty({ message: 'Password verification required' })
  passwordVerification: string;

  constructor(
    username: string,
    email: string,
    password: string,
    passwordVerification: string,
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.passwordVerification = passwordVerification;
  }
}
