import { Module } from '@nestjs/common';
import { UserResolver } from './resolver/users.resolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UserResolver, UsersService],
})
export class UsersModule {}
