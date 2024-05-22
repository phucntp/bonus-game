import { forwardRef, Module } from '@nestjs/common';
import { ImageController } from './upload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './image.schema';
import { GridFSBucketModule } from './gridFSBucket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    forwardRef(() => GridFSBucketModule),
  ],
  controllers: [ImageController],
  providers: [],
})
export class FileUploadModule {}
