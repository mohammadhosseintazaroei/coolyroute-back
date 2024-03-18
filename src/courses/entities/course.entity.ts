import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ICourse } from '../interfaces/course.interface';

@Entity()
export class CourseEntity implements ICourse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;
}
