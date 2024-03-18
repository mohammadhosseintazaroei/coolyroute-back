import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ICreateCourse } from '../interfaces/course.interface';

@ObjectType()
export class CourseModel {
  @Field({ nullable: true })
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  price: number;
}

@InputType()
export class CreateCourseInput implements ICreateCourse {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;
}
