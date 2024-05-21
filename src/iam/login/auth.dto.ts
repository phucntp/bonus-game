import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({ nullable: true })
  @IsString()
  name?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  password?: string;
}
