import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginModule } from './login/login.module';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [LoginModule, UserModule],
  providers: [JwtService],
})
export class IamModule {}
