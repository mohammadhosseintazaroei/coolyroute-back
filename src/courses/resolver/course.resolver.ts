import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CourseModel, CreateCourseInput } from '../models/course.model';
import { CourseService } from '../course.service';
import { EthResponse } from 'src/shared/models/response.models';

@Resolver('Auth')
export class CourseResolver {
  constructor(private courseService: CourseService) {}

  @Query(() => [CourseModel])
  async getAllCourses(): Promise<CourseModel[]> {
    return this.courseService.getAllCourses();
  }

  @Mutation((returns) => EthResponse)
  async createCourse(@Args('data') data: CreateCourseInput) {
    return this.courseService.createCourse(data);
  }
}
