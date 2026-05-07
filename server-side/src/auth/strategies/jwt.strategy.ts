import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../../user/user.service';
import { JwtPayload } from '../interfaces/jwt.interface';

type ExtractJwtWithBearer = {
  fromAuthHeaderAsBearerToken: () => (req: unknown) => string | null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const extractJwt = ExtractJwt as unknown as ExtractJwtWithBearer;

    super({
      jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    return this.userService.getById(payload.id);
  }
}
