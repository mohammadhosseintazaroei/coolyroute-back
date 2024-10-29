import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EventEntity } from './event.entity';

@Entity()
export class EventTicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // مثلاً VIP یا General

  @Column('decimal')
  price: number;

  @Column()
  availableQuantity: number;

  @ManyToOne(() => EventEntity, (event) => event.tickets)
  event: EventEntity;
}
