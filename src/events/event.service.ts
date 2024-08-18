import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEthResponse } from 'src/shared/types/response.interface';
import { Repository } from 'typeorm';
import { EventEntity } from './entities/event.entity';
import { ICreateEvent } from './interfaces/event.interface';
import { EventModel } from './models/event.model';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private repo: Repository<EventEntity>,
  ) {}

  async getALlEvents(): Promise<EventModel[]> {
    return await this.repo.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async getEventById(id: number): Promise<EventModel> {
    const event = await this.repo.findOne({ where: { id } });
    if (!event) {
      throw new BadRequestException('event not found');
    }
    return event;
  }

  async createEvent(event: ICreateEvent): Promise<IEthResponse> {
    const result = await this.repo.save(event);
    return {
      message: '',
      status: 4,
    };
  }
}
