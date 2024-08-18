import { Query, Resolver } from '@nestjs/graphql';
import { BriefSkillModel, SkillModel } from '../models/skill.model';
import { SkillService } from '../skill.service';

@Resolver(() => SkillModel)
export class SkillResolver {
  constructor(private service: SkillService) {}

  @Query(() => [BriefSkillModel])
  async getSkillsBrief() {
    const skills = await this.service.findAllSkills();
    return skills;
  }
}
