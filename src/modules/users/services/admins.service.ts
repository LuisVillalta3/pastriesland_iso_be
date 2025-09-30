import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from '@modules/users/entities/admin.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from '@config/env.config';
import { UserDto } from '@modules/users/dto/user.dto';
import { encryptPassword } from '@/utils/encrypt-password.util';
import { generateCustomPassword } from '@/utils/generate-password.util';
import { CreateAdminResponse } from '@modules/users/responses/create-admin.response';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly userRepository: Repository<AdminEntity>,
    private readonly configService: ConfigService<EnvConfig>,
  ) {}

  async createAdmin({
    name,
    lastName,
    email,
  }: UserDto): Promise<CreateAdminResponse> {
    const plain_password = generateCustomPassword();
    const encrypted_password = await encryptPassword(
      plain_password,
      +this.configService.get<number>('SALT_OR_ROUNDS', 10),
    );

    const admin = this.userRepository.create({
      name,
      lastName,
      email,
      password: encrypted_password,
    });

    await this.userRepository.save(admin);

    return {
      ...admin,
      password: plain_password, // Return the plain password for the client
    };
  }

  async getAllAdmins(): Promise<AdminEntity[]> {
    return await this.userRepository.find();
  }
}
