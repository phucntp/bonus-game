import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DatePrize extends Document {
  @Prop({ type: Date })
  sumStart: Date;

  @Prop({ type: Date })
  sumEnd: Date;

  @Prop({ type: Date })
  dailyStart: Date;

  @Prop({ type: Date })
  dailyEnd: Date;

  @Prop({ type: Date })
  deleted: boolean;
}

export const DatePrizeSchema = SchemaFactory.createForClass(DatePrize);
