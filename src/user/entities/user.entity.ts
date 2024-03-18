import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interfaces/user.interface';

@Entity()
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ length: 50, unique: true, nullable: false })
  phoneNumber: string;

  @Column('text', { nullable: true })
  email: string;

  @Exclude()
  @Column({ nullable: true, type: 'text', default: null })
  activationCode: string | null;
  @Column({ type: 'timestamp', default: null, nullable: true })
  otpGeneratedTime: Date;

  @Column({ type: 'boolean', default: false })
  verify: boolean;
}
