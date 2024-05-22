import {
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GridFSBucket } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Image } from './image.schema'; // Assume you have a Mongoose schema for storing image metadata

@Controller('images')
export class ImageController {
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
    private readonly gridFSBucket: GridFSBucket,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: any) {
    const readStream = createReadStream(join(__dirname, '..', '..', file.path));
    const writeStream = this.gridFSBucket.openUploadStream(file.originalname);
    readStream.pipe(writeStream);

    // Create a document in the Image collection with metadata about the uploaded file
    const image = new this.imageModel({
      filename: file.originalname,
      contentType: file.mimetype,
      fileId: writeStream.id, // Store the ID of the GridFS file
    });
    await image.save();

    return { message: 'File uploaded successfully' };
  }

  @Get(':filename')
  async downloadFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const downloadStream = this.gridFSBucket.openDownloadStreamByName(filename);
    downloadStream.pipe(res as any);
  }
}
