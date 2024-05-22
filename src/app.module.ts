import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { MemberModule } from './members/member.module';
import { PrizeModule } from './prize/prize.module';
import { PermissionModule } from './permissions/permission.module';
import { BonusModule } from './bonus/bonus.module';
import { DatePrizeModule } from './date-prize/datePrize.module';
import { IamModule } from './iam/iam.module';
import { FileUploadModule } from './uploads/upload.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    IamModule,
    UserModule,
    MemberModule,
    PrizeModule,
    PermissionModule,
    BonusModule,
    DatePrizeModule,
    // forwardRef(() => FileUploadModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
