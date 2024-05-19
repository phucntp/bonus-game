import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DatePrize } from './interfaces/datePrize.interface';
import { DatePrizeDto } from './dto/datePrize.dto';

@Injectable()
export class DatePrizeService {
  constructor(
    @InjectModel('DatePrize') private readonly datePrizeModel: Model<DatePrize>,
  ) {}

  async findAll(): Promise<DatePrize[]> {
    return await this.datePrizeModel.find().exec();
  }

  async create(createDatePrize: DatePrizeDto): Promise<DatePrize> {
    const createdDatePrize = new this.datePrizeModel(createDatePrize);
    return createdDatePrize.save();
  }

  async update(id: string, updateDatePrize: DatePrizeDto): Promise<DatePrize> {
    return this.datePrizeModel.findByIdAndUpdate(id, updateDatePrize);
  }

  async remove(id: string): Promise<DatePrize> {
    return this.datePrizeModel.findByIdAndDelete(id);
  }
}
