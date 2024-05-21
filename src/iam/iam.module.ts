import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserModule } from 'src/users/user.module';
import { AuthModule } from './login/auth.module';

@Module({
  imports: [AuthModule, UserModule],
  providers: [JwtService],
})
export class IamModule {}
