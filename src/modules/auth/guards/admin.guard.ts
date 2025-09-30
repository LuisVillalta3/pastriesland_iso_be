import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    if (user?.type !== 'admin')
      throw new UnauthorizedException('Access denied. Admins only.');

    return user;
  }
}
