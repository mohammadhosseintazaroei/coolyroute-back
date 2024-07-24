import { Module } from '@nestjs/common';
import { RoleEntity } from './role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { ACLEntity } from './acl.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, ACLEntity])],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
