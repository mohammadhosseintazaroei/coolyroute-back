import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IEvent } from '../interfaces/event.interface';
import { EnrollmentEntity } from 'src/enrollment/enrollment.entity';

@Entity()
export class EventEntity implements IEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @Column()
  date: Date;

  @Column()
  startTime: number;

  @Column()
  endTime: number;

  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.event)
  users: EnrollmentEntity[];
}
