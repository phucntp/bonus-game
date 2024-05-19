import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bonus } from './interfaces/bonus.interface';
import { BonusDto } from './dto/bonus.dto';

@Injectable()
export class BonusService {
  constructor(
    @InjectModel('Bonus') private readonly bonusModel: Model<Bonus>,
  ) {}

  async findAll(): Promise<Bonus[]> {
    return await this.bonusModel.find().exec();
  }

  async create(createBonus: BonusDto): Promise<Bonus> {
    const createdBonus = new this.bonusModel(createBonus);
    return createdBonus.save();
  }

  async update(id: string, updateBonus: BonusDto): Promise<Bonus> {
    return this.bonusModel.findByIdAndUpdate(id, updateBonus);
  }

  async remove(id: string): Promise<Bonus> {
    return this.bonusModel.findByIdAndDelete(id);
  }

  async removeBonus(ids: string[]): Promise<Bonus> {
    const res = await Promise.all(
      ids.map((id) => {
        return this.bonusModel.findByIdAndUpdate(id, { deleted: true });
      }),
    );
    return res as any;
  }
}
