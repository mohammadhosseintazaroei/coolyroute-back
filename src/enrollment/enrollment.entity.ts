import { CourseEntity } from 'src/courses/entities/course.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class EnrollmentEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'student_id' })
  user: UserEntity;

  @ManyToOne(() => CourseEntity)
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;
}
