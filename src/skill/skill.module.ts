import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from './entities/skill.entity';
import { SkillService } from './skill.service';
import { SkillCategoryEntity } from './entities/skill-category';
import { SkillResolver } from './resolver/skill.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkillEntity, SkillCategoryEntity]),
    ConfigModule,
  ],
  providers: [SkillResolver, SkillService],
})
export class SkillModule {}
