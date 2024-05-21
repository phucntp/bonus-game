import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/user.schema';

@Schema({ timestamps: true, minimize: false })
export class Bonus {
  @Prop()
  numberMember: number;

  @Prop()
  numberBonus: number;

  @Prop()
  sent: boolean;

  @Prop()
  ip: string;

  @Prop({ type: Date })
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  implementer: User;

  @Prop()
  deleted: boolean;
}

export const BonusSchema = SchemaFactory.createForClass(Bonus);
