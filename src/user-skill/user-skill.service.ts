import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSkillEntity } from './user-skill.entity';

@Injectable()
export class UserSkillService {
  constructor(
    @InjectRepository(UserSkillEntity)
    private repo: Repository<UserSkillEntity>,
  ) {}

  async getAllUserSKills(): Promise<UserSkillEntity[]> {
    const userskills = await this.repo.find({ relations: ['skill', 'user'] });
    return userskills;
  }
}
