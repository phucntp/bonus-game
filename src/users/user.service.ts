import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    if (!createUser.name || !createUser.password) {
      throw new HttpException(
        'Vui lòng nhập tên và mật khẩu!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newPassword = encryptPassword(createUser.password);
    let findUser: User;
    if (createUser.name && !createUser.email) {
      findUser = await await this.userModel.findOne({
        name: createUser.name ?? '',
      });
      if (findUser) {
        throw new HttpException('Tên đã tồn tại', HttpStatus.BAD_REQUEST);
      }
    }
    if (createUser.name && createUser.email) {
      findUser = await await this.userModel.findOne({
        name: createUser.name ?? '',
      });
      if (findUser) {
        throw new HttpException('Tên đã tồn tại', HttpStatus.BAD_REQUEST);
      } else {
        findUser = await this.userModel.findOne({
          name: createUser.name ?? '',
          email: createUser.email ?? '',
        });
        if (findUser) {
          throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST);
        }
      }
    }
    const createdUser = new this.userModel({
      ...createUser,
      password: newPassword,
    });
    return createdUser.save();
  }

  async update(id: string, updateUser: CreateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUser, {
      new: true,
      useFindAndModify: false,
    });
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
