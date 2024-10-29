import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItemEntity } from './order-item.entity';
import { IOrder, OrderStatus } from '../interface/order.interface';

@Entity()
export class OrderEntity implements IOrder {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;

  // @ManyToOne(() => UserEntity, (user) => user.events)
  // @JoinColumn({ name: 'userId' })
  // user: UserEntity;

  @Column()
  date: Date;

  @Column('decimal')
  total: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order)
  items: OrderItemEntity[];

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus; // Add this field to store the order's state
}
