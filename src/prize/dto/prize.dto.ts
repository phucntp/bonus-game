import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class PrizeDto {
  @ApiProperty({ nullable: true })
  @IsString()
  name?: string;

  @ApiProperty({ nullable: true })
  @IsNumber()
  numberBonus?: number;

  @ApiProperty({ nullable: true })
  @IsNumber()
  percentWin?: number;

  @ApiProperty({ nullable: true })
  @IsString()
  url?: string;

  @ApiProperty({ nullable: true })
  @IsNumber()
  order?: number;

  @ApiProperty({ nullable: true })
  @IsString()
  status?: string;

  @ApiProperty({ nullable: true })
  @IsBoolean()
  deleted?: boolean;
}
