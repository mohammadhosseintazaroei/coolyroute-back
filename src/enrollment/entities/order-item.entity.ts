import { EventTicketEntity } from 'src/events/entities/event-ticket.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';
import { IOrderItems } from '../interface/order-item.interface';

@Entity()
export class OrderItemEntity implements IOrderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column('decimal')
  price: number;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;

  @ManyToOne(() => EventTicketEntity)
  ticket: EventTicketEntity;
}
