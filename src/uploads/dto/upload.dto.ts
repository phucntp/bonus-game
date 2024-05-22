import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class BonusDto {
  @ApiProperty({ nullable: true })
  @IsNumber()
  numberMember?: number;

  @ApiProperty({ nullable: true })
  @IsNumber()
  numberBonus?: number;

  @ApiProperty({ nullable: true })
  @IsBoolean()
  sent?: boolean;

  @ApiProperty({ nullable: true })
  @IsString()
  ip?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  date?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  implementer?: string;

  @ApiProperty({ nullable: true })
  @IsBoolean()
  deleted?: boolean;
}
