import { Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthType } from './enums/auth-type.enum';
import { AuthGuard } from './decorators/auth-guard.decorator';

@ApiTags('auth')
@AuthGuard(AuthType.None)
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  public async login(): Promise<any> {
    return await this.loginService.login();
  }

  @Post('refresh-tokens')
  public async refreshTokens() {
    return await this.loginService.refreshTokens();
  }
}
