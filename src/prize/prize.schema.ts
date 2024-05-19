import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/user.schema';

@Schema()
export class Prize {
  @Prop()
  name: string;

  @Prop()
  numberBonus: number;

  @Prop()
  percentWin: number;

  @Prop()
  url: string;

  @Prop()
  order: number;

  @Prop()
  status: string;

  @Prop()
  deleted: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  user: User;
}

export const PrizeSchema = SchemaFactory.createForClass(Prize);
