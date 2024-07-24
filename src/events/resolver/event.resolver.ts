import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventModel, CreateEventInput } from '../models/event.model';
import { EventService } from '../event.service';
import { EthResponse } from 'src/shared/models/response.models';

@Resolver('Auth')
export class EventResolver {
  constructor(private eventService: EventService) {}

  @Query(() => [EventModel])
  async getAllEvents(): Promise<EventModel[]> {
    return this.eventService.getALlEvents();
  }

  @Mutation((returns) => EthResponse)
  async createEvent(@Args('data') data: CreateEventInput) {
    return this.eventService.createEvent(data);
  }
}
