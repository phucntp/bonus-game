import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { DatePrizeService } from './datePrize.service';
import { DatePrize } from './interfaces/datePrize.interface';
import { DatePrizeDto } from './dto/datePrize.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('date-price')
@ApiTags('DatePrize')
export class DatePrizeController {
  constructor(private readonly datePrizeService: DatePrizeService) {}

  @Get()
  async findAll(): Promise<{
    data: DatePrize[];
    message?: string;
    statusCode?: number;
  }> {
    const res = await this.datePrizeService.findAll();
    return { data: res };
  }

  @Post()
  async create(@Body() datePrize: DatePrizeDto): Promise<any> {
    const res = await this.datePrizeService.create(datePrize);
    return res;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() datePrize: DatePrizeDto,
  ): Promise<any> {
    return this.datePrizeService.update(id, datePrize);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.datePrizeService.remove(id);
  }
}
