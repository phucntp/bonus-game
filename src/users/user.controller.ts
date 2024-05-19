import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<{
    data: User[];
    message?: string;
    statusCode?: number;
  }> {
    const res = await this.userService.findAll();
    return { data: res };
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<any> {
    const res = await this.userService.create(user);
    return res;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: CreateUserDto,
  ): Promise<any> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.userService.remove(id);
  }
}
