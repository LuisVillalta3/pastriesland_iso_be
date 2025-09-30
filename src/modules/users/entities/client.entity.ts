import { ChildEntity, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { AddressEntity } from '@modules/users/entities/address.entity';

@ChildEntity()
export abstract class ClientEntity extends UserEntity {
  @OneToMany(() => AddressEntity, (item) => item.user, { cascade: true })
  addresses: AddressEntity[];
}
