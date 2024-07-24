import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSkillResolver } from './resolvers/user-skill.resolver';
import { UserSkillEntity } from './user-skill.entity';
import { UserSkillService } from './user-skill.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserSkillEntity]), ConfigModule],
  providers: [UserSkillResolver, UserSkillService],
})
export class UserSKillModule {}
