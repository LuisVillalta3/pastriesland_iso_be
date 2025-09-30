import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from '@config/env.config';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { iPayload } from '@modules/auth/interfaces/payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService<EnvConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY')!,
    });
  }

  validate(payload: iPayload) {
    return { userId: payload.sub, email: payload.email, type: payload.type };
  }
}
