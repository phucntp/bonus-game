import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Image extends Document {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  contentType: string;

  @Prop({ required: true })
  fileId: string; // GridFS file ID

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
