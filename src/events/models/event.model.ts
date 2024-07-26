import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ICreateEvent } from '../interfaces/event.interface';
@ObjectType()
export class EventModel {
  @Field({ nullable: true })
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  date: Date;

  @Field()
  startTime: number;

  @Field()
  endTime: number;
}

@InputType()
export class CreateEventInput implements ICreateEvent {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  date: Date;

  @Field()
  startTime: number;

  @Field()
  endTime: number;
}
