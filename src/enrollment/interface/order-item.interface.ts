import { IOrder } from './order.interface';

export interface IOrderItems {
  id: number;

  quantity: number;
  price: number;
  order: IOrder;
  // ticket: EventTicketEntity;
}
