import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IEvent } from '../interfaces/event.interface';

@Entity()
export class EventEntity implements IEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @Column()
  date: Date;

  @Column()
  startTime: number;

  @Column()
  endTime: number;
}
