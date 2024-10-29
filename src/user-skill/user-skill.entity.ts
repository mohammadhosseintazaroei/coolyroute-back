import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IUserSkill } from './interfaces/user.interface';
import { UserEntity } from 'src/user/entities/user.entity';
import { SkillEntity } from 'src/skill/entities/skill.entity';

@Entity({ name: 'user_skills' })
@Unique(['user', 'skill'])
export class UserSkillEntity implements IUserSkill {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  skillId: number;
  @ManyToOne(() => UserEntity, (user) => user.userSkills)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => SkillEntity, (skill) => skill.users)
  @JoinColumn({ name: 'skillId' })
  skill: SkillEntity;
}
