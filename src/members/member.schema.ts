import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/user.schema';

export type UserDocument = HydratedDocument<Member>;

@Schema()
export class Member {
  @Prop()
  quantity: number;

  @Prop()
  betAmount: number;

  @Prop()
  timesJoin: number;

  @Prop()
  timesRest: number;

  @Prop()
  ip: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  admin: User;

  @Prop()
  deleted: boolean;

  @Prop()
  code: string;

  @Prop()
  id: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
