import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleType } from './roles.enum';
import { GQLRoleGuard, JwtGQLAuthGuard, Roles } from './gaurd/gql-auth.guard';
import { GQLMiddlewareGuard } from './gaurd/gql-middleware.guard';

export function GQLAuth(...roles: RoleType[]) {
  if (roles.length === 0) {
    roles = [RoleType.admin];
  }
  return applyDecorators(
    Roles(roles),
    UseGuards(JwtGQLAuthGuard, GQLRoleGuard, GQLMiddlewareGuard),
    // UseGuards(JwtGQLAuthGuard, GQLRoleGuard, GQLMiddlewareGuard),
  );
}
