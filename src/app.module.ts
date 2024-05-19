import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './members/member.module';
import { PrizeModule } from './prize/prize.module';
import { PermissionModule } from './permissions/permission.module';
import { BonusModule } from './bonus/bonus.module';
import { DatePrizeModule } from './date-prize/datePrize.module';
import { IamModule } from './iam/iam.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/bonus-game'),
    UserModule,
    AuthModule,
    MemberModule,
    PrizeModule,
    PermissionModule,
    BonusModule,
    DatePrizeModule,
    IamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
