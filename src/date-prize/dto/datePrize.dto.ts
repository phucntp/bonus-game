import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class DatePrizeDto {
  @ApiProperty({
    nullable: true,
  })
  @IsDate()
  readonly sumStart?: Date;

  @ApiProperty({
    nullable: true,
  })
  @IsDate()
  readonly sumEnd?: Date;

  @ApiProperty({
    nullable: true,
  })
  @IsDate()
  readonly dailyStart?: Date;

  @ApiProperty({
    nullable: true,
  })
  @IsDate()
  readonly dailyEnd?: Date;

  @ApiProperty({
    nullable: true,
  })
  @IsDate()
  readonly deleted?: boolean;
}
