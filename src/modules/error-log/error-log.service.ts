import { Injectable } from '@nestjs/common';
import { ErrorLogEntity } from './error-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ErrorLogService {
  constructor(
    @InjectRepository(ErrorLogEntity)
    private readonly errorLogRepo: Repository<ErrorLogEntity>,
  ) {}

  async create(data: Partial<ErrorLogEntity>): Promise<void> {
    const log = this.errorLogRepo.create(data);
    await this.errorLogRepo.save(log);
  }

  async getAll() {
    return await this.errorLogRepo.find();
  }
}
