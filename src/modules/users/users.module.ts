import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AdminEntity } from '@modules/users/entities/admin.entity';
import { ClientEntity } from '@modules/users/entities/client.entity';
import { AdminsService } from './services/admins.service';
import { AdminsController } from './controllers/admins.controller';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ErrorLogModule } from '@modules/error-log/error-log.module';
import { AddressEntity } from '@modules/users/entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AdminEntity,
      ClientEntity,
      AddressEntity,
    ]),
    ErrorLogModule,
  ],
  exports: [TypeOrmModule],
  providers: [AdminsService, UsersService],
  controllers: [AdminsController, UsersController],
})
export class UsersModule {}
