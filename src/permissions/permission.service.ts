import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission } from './interfaces/permission.interface';
import { PermissionDto } from './dto/permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel('Permission')
    private readonly permissionModel: Model<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return await this.permissionModel.find().exec();
  }

  async create(createPermission: PermissionDto): Promise<Permission> {
    const createdPermission = new this.permissionModel(createPermission);
    return createdPermission.save();
  }

  async update(
    id: string,
    updatePermission: PermissionDto,
  ): Promise<Permission> {
    return this.permissionModel.findByIdAndUpdate(id, updatePermission);
  }

  async remove(id: string): Promise<Permission> {
    return this.permissionModel.findByIdAndDelete(id);
  }
}
