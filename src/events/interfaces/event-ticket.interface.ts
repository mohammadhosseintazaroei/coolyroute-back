import { IEvent } from './event.interface';

export interface IEventTicket {
  id: number;
  type: string; // مثلاً VIP یا General
  price: number;
  availableQuantity: number;
  event: IEvent;
}
