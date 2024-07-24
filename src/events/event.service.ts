import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEthResponse } from 'src/shared/types/response.interface';
import { Repository } from 'typeorm';
import { EventEntity } from './entities/event.entity';
import { ICreateCourse } from './interfaces/event.interface';
import { EventModel } from './models/event.model';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private repo: Repository<EventEntity>,
  ) {}

  async getAllCourses(): Promise<EventModel[]> {
    return await this.repo.find();
  }

  async createCourse(course: ICreateCourse): Promise<IEthResponse> {
    const result = await this.repo.save(course);

    return {
      message: '',
      status: 4,
    };
  }
}
