import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsString } from 'class-validator';

export class PermissionDto {
  @ApiProperty({ nullable: true })
  @IsArray()
  permissions?: string[];

  @ApiProperty({ nullable: true })
  @IsString()
  user?: string;

  @ApiProperty({ nullable: true })
  @IsBoolean()
  deleted?: boolean;
}
