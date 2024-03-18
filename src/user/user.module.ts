import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ConfigModule],
  providers: [UserResolver, UserService],
  exports: [UserService, TypeOrmModule.forFeature([UserEntity]), ConfigModule],
})
export class UsersModule {}
