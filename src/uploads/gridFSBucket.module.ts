import { Module } from '@nestjs/common';
import { GridFSBucket } from 'typeorm';

@Module({
  providers: [GridFSBucket], // Import and provide the GridFSBucketService
  exports: [GridFSBucket], // Export the GridFSBucketService for use in other modules
})
export class GridFSBucketModule {}
