import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ICourse } from '../interfaces/event.interface';

@Entity()
export class EventEntity implements ICourse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;
}
