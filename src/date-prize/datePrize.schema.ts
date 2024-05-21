import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, minimize: false })
export class DatePrize extends Document {
  @Prop({ type: Date })
  sumStart: Date;

  @Prop({ type: Date })
  sumEnd: Date;

  @Prop({ type: Date })
  dailyStart: Date;

  @Prop({ type: Date })
  dailyEnd: Date;

  @Prop({ type: Boolean })
  deleted: boolean;
}

export const DatePrizeSchema = SchemaFactory.createForClass(DatePrize);
