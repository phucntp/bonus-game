import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './interfaces/permission.interface';
import { PermissionDto } from './dto/permission.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/iam/login/decorators/auth-guard.decorator';
import { AuthType } from 'src/iam/login/enums/auth-type.enum';

@Controller('permission')
@ApiTags('Permission')
@AuthGuard(AuthType.Bearer)
@ApiBearerAuth()
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async findAll(): Promise<{
    data: Permission[];
    message?: string;
    statusCode?: number;
  }> {
    const res = await this.permissionService.findAll();
    return { data: res };
  }

  @Post()
  async create(@Body() permission: PermissionDto): Promise<any> {
    const res = await this.permissionService.create(permission);
    return res;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() permission: PermissionDto,
  ): Promise<any> {
    return this.permissionService.update(id, permission);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.permissionService.remove(id);
  }
}
