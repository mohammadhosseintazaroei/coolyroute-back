import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';
import { ACLEntity } from './acl.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity) private repo: Repository<RoleEntity>,
    @InjectRepository(ACLEntity) private acl: Repository<ACLEntity>,
  ) {}

  async getById(id: number) {
    return this.repo.findOne({
      where: { id },
    });
  }

  async getUserRoles(userId: number) {
    const roles = await this.acl.find({
      where: {
        userId,
      },
      relations: ['role'],
      select: {
        id: true,
        role: {
          id: true,
          name: true,
        },
      },
    });
    console.log(roles);
    return roles.map((role) => role.role.name);
  }
}
