import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from '@config/env.config';
import { AuthService } from './auth.service';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';
import { AdminAuthController } from './controllers/admin-auth.controller';
import { ClientAuthController } from './controllers/client-auth.controller';
import { ErrorLogModule } from '@modules/error-log/error-log.module';

@Module({
  imports: [
    UsersModule,
    ErrorLogModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService<EnvConfig>) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AdminAuthController, ClientAuthController],
})
export class AuthModule {}
