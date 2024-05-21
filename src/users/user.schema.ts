import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Permission } from 'src/permissions/permission.schema';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: number;

  @Prop()
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' })
  permission: Permission;
}

export const UserSchema = SchemaFactory.createForClass(User);
