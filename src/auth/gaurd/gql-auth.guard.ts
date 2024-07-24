import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ACLEntity } from 'src/role/acl.entity';
import { DataSource } from 'typeorm';
import { RoleType } from '../roles.enum';

export const Roles = Reflector.createDecorator<RoleType[]>();

@Injectable()
export class GQLRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly dataSource: DataSource,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const user = request?.user;
    if (!user) {
      return false;
    }

    const roles = this.reflector.getAllAndOverride(Roles, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (user.isAdmin) {
      return true;
    }
    if (!roles || roles.length == 0) {
      // requset is for admin only but user is not admin
      return false;
    }
    if (roles.includes(RoleType.normal)) {
      // skip if request role is normal
      return true;
    }
    const userRoles = await this.dataSource.manager.find(ACLEntity, {
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        role: {
          name: true,
        },
      },
      relations: ['role'],
    });
    request.user.roles = userRoles.map((item) => item.role.name as RoleType);
    if (
      !userRoles.find((userRole) =>
        roles.includes(userRole.role.name as RoleType),
      )
    ) {
      // no role found for user to access this request
      return false;
    }
    return true;
  }
}

@Injectable()
export class JwtGQLAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
