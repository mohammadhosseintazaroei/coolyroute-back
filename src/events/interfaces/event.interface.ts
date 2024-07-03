export interface IEvent {
  id: number;
  title: string;
  description?: string;
  price: number;
  startTime: number;
  endTime: number;
}

export interface ICreateEvent extends Omit<IEvent, 'id'> {}
