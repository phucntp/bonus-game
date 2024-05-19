import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BonusController } from './bonus.controller';
import { BonusService } from './bonus.service';
import { Bonus, BonusSchema } from './bonus.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bonus.name, schema: BonusSchema }]),
  ],
  controllers: [BonusController],
  providers: [BonusService],
})
export class BonusModule {}
