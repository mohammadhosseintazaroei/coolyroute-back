import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsOptional } from 'class-validator';

export interface Url {
  path: string;
  method: 'Get' | 'Post' | 'Put' | 'Patch' | 'Delete' | 'All';
}

@Entity()
export class RoleEntity {
  @IsOptional({ always: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text', {
    transformer: {
      to: (value) => JSON.stringify(value),
      from(value: any): any {
        return JSON.parse(value);
      },
    },
  })
  urls: Url[];

  @CreateDateColumn()
  createDate: string;

  @UpdateDateColumn()
  updateDate: string;
}
