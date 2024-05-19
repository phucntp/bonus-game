import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async create(createUser: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUser);
    return createdUser.save();
  }

  async update(id: string, updateUser: CreateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUser);
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
