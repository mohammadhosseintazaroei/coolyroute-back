import { EventEntity } from 'src/events/entities/event.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['user', 'event'])
export class EnrollmentEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  eventId: number;
  @ManyToOne(() => UserEntity, (user) => user.events)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => EventEntity, (event) => event.users)
  @JoinColumn({ name: 'eventId' })
  event: EventEntity;
}
