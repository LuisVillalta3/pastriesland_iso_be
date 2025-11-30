import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from '@modules/contacts/contact.entity';
import { ErrorLogModule } from '@modules/error-log/error-log.module';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity]), ErrorLogModule],
  exports: [TypeOrmModule],
  providers: [ContactsService],
  controllers: [ContactsController],
})
export class ContactsModule {}
