import { Query, Resolver } from '@nestjs/graphql';
import { UserSkillService } from '../user-skill.service';
import { Delete } from '@nestjs/common';
import { UserSkillModel } from '../models/user-skill.model';

@Resolver()
export class UserSkillResolver {
  constructor(private service: UserSkillService) {}

  @Query(() => [UserSkillModel])
  async getAllUserSkill() {
    return await this.service.getAllUserSKills();
  }
}
