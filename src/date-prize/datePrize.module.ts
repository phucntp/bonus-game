import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatePrizeController } from './datePrize.controller';
import { DatePrizeService } from './datePrize.service';
import { DatePrizeSchema, DatePrize } from './datePrize.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DatePrize.name, schema: DatePrizeSchema },
    ]),
  ],
  controllers: [DatePrizeController],
  providers: [DatePrizeService],
})
export class DatePrizeModule {}
