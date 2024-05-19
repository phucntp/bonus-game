import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    nullable: true,
  })
  readonly name?: string;

  @ApiProperty({
    nullable: true,
  })
  readonly email?: string;

  @ApiProperty({
    nullable: true,
  })
  readonly deleted?: boolean;

  @ApiProperty({
    nullable: true,
  })
  readonly permission?: string;
}
