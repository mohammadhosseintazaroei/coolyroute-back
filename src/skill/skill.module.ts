import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from './entities/skill.entity';
import { SkillService } from './skill.service';
import { SkillCategoryEntity } from './entities/skill-category';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkillEntity, SkillCategoryEntity]),
    ConfigModule,
  ],
  providers: [SkillService],
})
export class SkillModule {}
