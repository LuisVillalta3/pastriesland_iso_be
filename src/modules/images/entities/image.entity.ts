import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'images' })
export class ImageEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @Column()
  imageableType: string;

  @Column()
  imageableId: string;

  @CreateDateColumn()
  createdAt: Date;
}
