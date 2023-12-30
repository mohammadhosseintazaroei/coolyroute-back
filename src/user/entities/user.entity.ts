import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
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

  @Exclude()
  @Column({ nullable: true, type: 'text', default: null })
  activationCode: string | null;
}
