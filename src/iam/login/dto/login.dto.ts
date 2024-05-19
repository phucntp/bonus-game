import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/user.dto';

export class LoginDto extends PickType(CreateUserDto, [
  'name',
  'password',
] as const) {}
