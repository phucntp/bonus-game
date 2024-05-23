import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberDto } from './dto/member.dto';
import { Member } from './member.schema';
import { MemberExcelDto } from './dto/member-excel.dto';
import { User } from 'src/users/user.schema';
import { omit } from 'lodash';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel('Member') private readonly memberModel: Model<Member>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<Member[]> {
    return await this.memberModel
      .find({ deleted: { $ne: true } })
      .populate('admin')
      .exec();
  }

  async create(createMember: MemberDto): Promise<Member> {
    const createdMember = new this.memberModel(createMember);
    return createdMember.save();
  }

  async update(id: string, updateMember: MemberDto): Promise<Member> {
    try {
      return await this.memberModel.findByIdAndUpdate(id, updateMember, {
        new: true,
        useFindAndModify: false,
      });
    } catch (error) {
      throw new HttpException(JSON.stringify(error), HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<Member> {
    return this.memberModel.findByIdAndDelete(id);
  }

  async removeMembers(ids: string[]): Promise<Member[]> {
    const res = await Promise.all(
      ids.map(async (id) => {
        return await this.update(id, { deleted: true });
      }),
    );
    return res;
  }

  async uploadExcel(
    dataExcels: MemberExcelDto[],
  ): Promise<Omit<Member, 'password'>> {
    const res = await Promise.all(
      dataExcels.map(async (data) => {
        const findData = await this.memberModel.findOne({ code: data.code });
        const findUser = await this.userModel.findOne({ name: data.nameAdmin });
        if (findData) {
          this.update(findData._id?.toString(), {
            ...omit(data, ['nameAdmin']),
            admin: findUser?._id?.toString(),
          });
        } else {
          this.create({
            ...omit(data, ['nameAdmin']),
            admin: findUser?._id?.toString(),
          });
        }
      }),
    );
    return res as any;
  }
}
