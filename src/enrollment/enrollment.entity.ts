import { EventEntity } from 'src/events/entities/event.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class EnrollmentEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => EventEntity)
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;
}
