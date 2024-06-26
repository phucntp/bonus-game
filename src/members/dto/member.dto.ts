import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class MemberDto {
  @ApiProperty({ nullable: true })
  @IsNumber()
  quantity?: number;

  @ApiProperty({ nullable: true })
  @IsNumber()
  betAmount?: number;

  @ApiProperty({ nullable: true })
  @IsNumber()
  timesJoin?: number;

  @ApiProperty({ nullable: true })
  @IsNumber()
  timesRest?: number;

  @ApiProperty({ nullable: true })
  @IsString()
  ip?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  admin?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  code?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  _id?: string;

  @ApiProperty({ nullable: true, default: false })
  @IsBoolean()
  deleted?: boolean;
}
