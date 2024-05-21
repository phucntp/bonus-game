import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';

@Schema()
export class Permission extends Document {
  @Prop()
  permissions: string[];

  @Prop()
  deleted: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
