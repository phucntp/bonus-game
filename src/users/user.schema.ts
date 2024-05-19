import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Permission } from 'src/permissions/permission.schema';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'permissions' })
  user: Permission;
}

export const UserSchema = SchemaFactory.createForClass(User);
