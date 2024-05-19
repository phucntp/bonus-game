import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService, ConfigType } from '@nestjs/config';
import jwtConfig from './config/jwt.config';

@Injectable()
export class LoginService {
  constructor(
    private configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async login(): Promise<any> {
    try {
      return await this.generateTokens();
    } catch (err) {
      console.log(err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async generateTokens() {
    try {
      return {};
    } catch (error) {
      throw error;
    }
  }

  async refreshTokens() {
    try {
      return this.generateTokens();
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        id: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }
}
