import { ChildEntity, Column } from 'typeorm';
import { UserEntity } from './user.entity';

@ChildEntity()
export abstract class AdminEntity extends UserEntity {
  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
