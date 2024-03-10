import { PartialType } from '@nestjs/mapped-types';
import { RegistrationDto } from './register.dto';

export class LoginDto extends PartialType(RegistrationDto) {}
