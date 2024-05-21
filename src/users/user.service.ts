import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/user.dto';
import { encryptPassword } from 'src/helpers/passwordService';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async create(createUser: CreateUserDto): Promise<User> {
    const newPassword = encryptPassword(createUser.password);
    const createdUser = new this.userModel({
      ...createUser,
      password: newPassword,
    });
    return createdUser.save();
  }

  async update(id: string, updateUser: CreateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUser);
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }

  async findByUser(userName: string, passwordAscii: string): Promise<User> {
    try {
      const data = await this.userModel.findOne({
        name: userName ?? '',
        password: passwordAscii ?? '',
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
