import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('login')
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() data: any): Promise<any> {
    const res = await this.authService.createToken(data);
    return res;
  }
}
