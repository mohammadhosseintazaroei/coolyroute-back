import { IUser } from 'src/user/interfaces/user.interface';
import { IOrderItems } from './order-item.interface';

export interface IOrder {
  id: number;
  userId: number;
  date: Date;
  total: number;
  user: IUser;
  items: IOrderItems[];
}
export enum OrderStatus {
  PENDING = 'pending',
  CANCELED = 'canceled',
  PAID = 'paid',
}
