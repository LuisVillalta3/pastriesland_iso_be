import { Column, Entity, TableInheritance } from 'typeorm';
import { BaseEntity } from '@common/entities/base.entity';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ name: 'last_login', nullable: true })
  lastLogin?: Date;

  async validatePassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }
}
