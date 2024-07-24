import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SkillCategoryEntity } from './skill-category';
import { UserSkillEntity } from 'src/user-skill/user-skill.entity';

@Entity()
export class SkillEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => SkillCategoryEntity, (category) => category.skills)
  @JoinTable({
    name: 'skill_category', // Specify the junction table name
    joinColumn: { name: 'skillId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' },
  })
  categories: SkillCategoryEntity[];
  @OneToMany(() => UserSkillEntity, (userSkill) => userSkill.skill)
  users: UserSkillEntity[];
}
