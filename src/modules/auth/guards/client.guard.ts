import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ClientGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    if (user?.type !== 'client')
      throw new UnauthorizedException('Access denied. Clients only.');

    return user;
  }
}
