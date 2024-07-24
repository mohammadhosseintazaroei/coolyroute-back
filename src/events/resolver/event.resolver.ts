import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventModel, CreateCourseInput } from '../models/event.model';
import { EventService } from '../event.service';
import { EthResponse } from 'src/shared/models/response.models';

@Resolver('Auth')
export class EventResolver {
  constructor(private eventService: EventService) {}

  @Query(() => [EventModel])
  async getAllCourses(): Promise<EventModel[]> {
    return this.eventService.getAllCourses();
  }

  @Mutation((returns) => EthResponse)
  async createCourse(@Args('data') data: CreateCourseInput) {
    return this.eventService.createCourse(data);
  }
}
