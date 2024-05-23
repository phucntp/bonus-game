import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BonusService } from './bonus.service';
import { Bonus } from './interfaces/bonus.interface';
import { BonusDto } from './dto/bonus.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthType } from 'src/iam/login/enums/auth-type.enum';
import { AuthGuard } from 'src/iam/login/decorators/auth-guard.decorator';

@Controller('bonus')
@ApiTags('bonus')
@AuthGuard(AuthType.Bearer)
@ApiBearerAuth()
export class BonusController {
  constructor(private readonly bonusService: BonusService) {}

  @Get()
  async findAll(): Promise<{
    data: Bonus[];
    message?: string;
    statusCode?: number;
  }> {
    const res = await this.bonusService.findAll(true);
    return { data: res };
  }

  @Post()
  async create(@Body() bonus: BonusDto): Promise<any> {
    const res = await this.bonusService.create(bonus);
    return res;
  }

  @Post('remove-bonuses')
  async removeBonuses(@Body() ids: string[]): Promise<any> {
    const res = await this.bonusService.removeBonus(ids);
    return res;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() bonus: BonusDto): Promise<any> {
    return this.bonusService.update(id, bonus);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.bonusService.remove(id);
  }
}
