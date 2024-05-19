import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrizeController } from './prize.controller';
import { PrizeService } from './prize.service';
import { Prize, PrizeSchema } from './prize.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Prize.name, schema: PrizeSchema }]),
  ],
  controllers: [PrizeController],
  providers: [PrizeService],
})
export class PrizeModule {}
