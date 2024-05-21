import { Body, Controller, forwardRef, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { encryptPassword } from 'src/helpers/passwordService';
import { AuthType } from 'src/iam/login/enums/auth-type.enum';
import { AuthGuard } from 'src/iam/login/decorators/auth-guard.decorator';

@Controller('login')
@ApiTags('Login')
@AuthGuard(AuthType.None)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() loginDto: AuthDto): Promise<string> {
    const enPassword = encryptPassword(loginDto.password);
    return this.authService.createToken({ ...loginDto, password: enPassword });
  }
}
