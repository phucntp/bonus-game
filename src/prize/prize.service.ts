import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prize } from './interfaces/prize.interface';
import { PrizeDto } from './dto/prize.dto';
import { StatusPrize } from 'src/constant/enum';

@Injectable()
export class PrizeService {
  constructor(
    @InjectModel('Prize') private readonly prizeModel: Model<Prize>,
  ) {}

  async findAll(): Promise<Prize[]> {
    return await this.prizeModel
      .find({ deleted: { $ne: true }, status: { $ne: StatusPrize.INACTIVE } })
      .exec();
  }

  async create(createPrize: PrizeDto): Promise<Prize> {
    const createdPrize = new this.prizeModel(createPrize);
    return createdPrize.save();
  }

  async update(id: string, updatePrize: PrizeDto): Promise<Prize> {
    return this.prizeModel.findByIdAndUpdate(id, updatePrize, {
      new: true,
      useFindAndModify: false,
    });
  }

  async remove(id: string): Promise<Prize> {
    return this.prizeModel.findByIdAndDelete(id);
  }

  async removePrizes(ids: string[]): Promise<Prize> {
    const res = await Promise.all(
      ids.map((id) => {
        return this.update(id, { deleted: true });
      }),
    );
    return res as any;
  }
}
