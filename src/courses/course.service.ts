import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEthResponse } from 'src/shared/types/response.interface';
import { Repository } from 'typeorm';
import { CourseEntity } from './entities/course.entity';
import { ICreateCourse } from './interfaces/course.interface';
import { CourseModel } from './models/course.model';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private repo: Repository<CourseEntity>,
  ) {}

  async getAllCourses(): Promise<CourseModel[]> {
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
