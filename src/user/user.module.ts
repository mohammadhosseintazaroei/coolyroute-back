import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './user.service';
import { UserSkillEntity } from 'src/user-skill/user-skill.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserSkillEntity]),
    ConfigModule,
  ],
  providers: [UserResolver, UserService],
  exports: [UserService, TypeOrmModule.forFeature([UserEntity]), ConfigModule],
})
export class UsersModule {}
