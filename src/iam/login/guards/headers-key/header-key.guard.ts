import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { REQUEST_USER_KEY, TYPE_TOKEN_BEARER } from '../../../iam.constants';
import jwtConfig from '../../config/jwt.config';
import { decryptAES128 } from 'src/helpers/passwordService';

@Injectable()
export class HeaderKeyGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const key = request.headers.uploadkey;
    const decryptedKey = this.decryptKey(key);
    const token = this.extractTokenFromHeader(request);

    if (!key && !token) {
      throw new UnauthorizedException();
    }

    try {
      if (decryptedKey === process.env.UPLOAD_KEY) {
        return true;
      } else {
        const payload = await this.jwtService.verifyAsync(
          token,
          this.jwtConfiguration,
        );
        request[REQUEST_USER_KEY] = payload;
      }
    } catch (err) {
      throw new UnauthorizedException(HttpStatus.UNAUTHORIZED, err.message);
    }
    return true;
  }

  private decryptKey(key: string): string | undefined {
    const decodeHeader = decryptAES128(key, process.env.SHOP_KEY);
    return decodeHeader;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === TYPE_TOKEN_BEARER ? token : undefined;
  }
}
