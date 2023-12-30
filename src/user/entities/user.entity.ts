import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserModel } from '../models/user.model';

@Entity()
export class UserEntity extends UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column('varchar')
  phoneNumber: string;

  @Column('text', { nullable: true })
  email?: string;

  @Column({ nullable: true, type: 'text', default: null })
  activationCode: string | null;
}
