import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/user.schema';

@Schema()
export class Bonus {
  @Prop()
  numberMember: number;

  @Prop()
  numberBonus: number;

  @Prop()
  sent: boolean;

  @Prop()
  ip: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  implementer: User;

  @Prop()
  deleted: boolean;
}

export const BonusSchema = SchemaFactory.createForClass(Bonus);
