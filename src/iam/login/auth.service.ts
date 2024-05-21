import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { pick } from 'lodash';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async createToken(payload: AuthDto): Promise<any> {
    const findUser = await this.userModel.findOne({
      name: payload.name ?? '',
      password: payload.password ?? '',
    });
    if (findUser) {
      const accessToken = await this.jwtService.signAsync(
        {
          id: findUser._id,
          payload,
        },
        {
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          secret: this.jwtConfiguration.secret,
          expiresIn: this.jwtConfiguration.accessTokenTtl,
        },
      );
      return {
        accessToken: accessToken,
        user: pick(findUser, ['name', 'email', '_id']),
      };
    } else {
      throw new Error('Tên hoặc password không đúng!');
    }
  }
}
