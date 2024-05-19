import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PrizeService } from './prize.service';
import { Prize } from './interfaces/prize.interface';
import { PrizeDto } from './dto/prize.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('prize')
@ApiTags('prize')
export class PrizeController {
  constructor(private readonly prizeService: PrizeService) {}

  @Get()
  async findAll(): Promise<{
    data: Prize[];
    message?: string;
    statusCode?: number;
  }> {
    const res = await this.prizeService.findAll();
    return { data: res };
  }

  @Post()
  async create(@Body() prize: PrizeDto): Promise<any> {
    const res = await this.prizeService.create(prize);
    return res;
  }

  @Post('remove-prizes')
  async removePrizes(@Body() ids: string[]): Promise<any> {
    const res = await this.prizeService.removePrizes(ids);
    return res;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() prize: PrizeDto): Promise<any> {
    return this.prizeService.update(id, prize);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.prizeService.remove(id);
  }
}
