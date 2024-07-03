export interface IEvent {
  id: number;
  title: string;
  description?: string;
  price: number;
  date: Date;
  startTime: number;
  endTime: number;
}

export interface ICreateEvent extends Omit<IEvent, 'id'> {}
