import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IEvent } from '../interfaces/event.interface';
import { OrderEntity } from 'src/enrollment/entities/order.entity';
import { EventTicketEntity } from './event-ticket.entity';

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

  @OneToMany(() => EventTicketEntity, (ticket) => ticket.event)
  tickets: EventTicketEntity[];
}
