import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SkillEntity } from './skill.entity';

@Entity()
export class SkillCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => SkillEntity, (skill) => skill.categories)
  @JoinTable({
    name: 'skill_category', // Same junction table name
    joinColumn: { name: 'categoryId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'skillId', referencedColumnName: 'id' },
  })
  skills: SkillEntity[];
}
