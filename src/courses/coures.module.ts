import { Module } from '@nestjs/common';
import { CourseResolver } from './resolver/course.resolver';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity]), ConfigModule],
  providers: [CourseResolver, CourseService],
  exports: [
    CourseService,
    TypeOrmModule.forFeature([CourseEntity]),
    ConfigModule,
  ],
})
export class CourseModule {}
