import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillEntity } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(SkillEntity)
    private repo: Repository<SkillEntity>,
  ) {}
  async findAllSkills(): Promise<SkillEntity[]> {
    return this.repo.find({
      select: {
        id: true,
        name: true,
      },
    });
  }
}
