import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';
import jwtConfig from './config/jwt.config';
import { HeaderKeyGuard } from './guards/headers-key/header-key.guard';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
    HeaderKeyGuard,
    LoginService,
  ],
  controllers: [LoginController],
})
export class LoginModule {}
