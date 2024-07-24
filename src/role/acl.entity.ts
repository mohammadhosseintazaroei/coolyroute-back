import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { IsOptional } from 'class-validator';
import { RoleEntity } from './role.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity()
export class ACLEntity {
  @IsOptional({ always: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: Relation<UserEntity>;

  @Column('int')
  roleId: number;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'roleId' })
  role: Relation<RoleEntity>;
}
