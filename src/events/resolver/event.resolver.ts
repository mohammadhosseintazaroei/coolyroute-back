import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EthResponse } from 'src/shared/models/response.models';
import { EventService } from '../event.service';
import { CreateEventInput, EventModel } from '../models/event.model';

@Resolver('Auth')
export class EventResolver {
  constructor(private eventService: EventService) {}
  @Query(() => [EventModel])
  async getAllEvents(): Promise<EventModel[]> {
    return this.eventService.getALlEvents();
  }
  @Query(() => EventModel)
  async getEventById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<EventModel> {
    return this.eventService.getEventById(id);
  }
  @Mutation((returns) => EthResponse)
  async createEvent(@Args('data') data: CreateEventInput) {
    return this.eventService.createEvent(data);
  }
}
