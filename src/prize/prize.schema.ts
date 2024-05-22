import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/user.schema';
import { StatusPrize } from '../constant/enum';

@Schema({ timestamps: true, minimize: false })
export class Prize {
  @Prop()
  name: string;

  @Prop()
  numberBonus: number;

  @Prop()
  percentWin: number;

  @Prop()
  urlImage: string;

  @Prop()
  order: number;

  @Prop({ default: StatusPrize.ACTIVE })
  status: StatusPrize;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const PrizeSchema = SchemaFactory.createForClass(Prize);
