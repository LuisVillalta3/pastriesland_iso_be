import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactEntity } from '@modules/contacts/contact.entity';
import { Repository } from 'typeorm';
import { ContactDto } from '@modules/contacts/contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepo: Repository<ContactEntity>,
  ) {}

  async create({
    name,
    message,
    whatsapp,
    email,
  }: ContactDto): Promise<ContactEntity> {
    return await this.contactRepo.save({
      name,
      message,
      whatsapp,
      email,
    });
  }

  async findAll() {
    const contacts = await this.contactRepo.find({
      order: { createdAt: 'DESC' },
    });

    return { results: contacts };
  }
}
