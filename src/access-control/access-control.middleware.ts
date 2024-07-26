import { applyDecorators, ForbiddenException } from '@nestjs/common';
import {
  Extensions,
  FieldMiddleware,
  MiddlewareContext,
  NextFn,
} from '@nestjs/graphql';
import { RoleType } from 'src/auth/roles.enum';

export const FieldRole = (...roles: RoleType[]) => {
  if (!roles || roles.length === 0) {
    return applyDecorators(
      Extensions({
        // TODO must add new role to here
        roles: [RoleType.normal],
      }),
    );
  }
  return applyDecorators(
    Extensions({
      roles,
    }),
  );
};

export const AccessControlMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const { info, context } = ctx;
  const { extensions } = info.parentType.getFields()[info.fieldName];
  const { user } = context.req;
  const roles = extensions.roles as RoleType[];
  if (!user) {
    if (!roles) {
      return next();
    }
    throw new ForbiddenException('no-user-found');
  }
  if ((user && user?.roles?.includes(RoleType.admin)) || !roles) {
    return next();
  }

  if (!user?.roles?.find((userRole) => roles.includes(userRole as RoleType))) {
    // or just "return null" to ignore
    throw new ForbiddenException(
      `User does not have sufficient permissions to access "${info.fieldName}" field.`,
    );
  }

  const value = await next();

  return value;
};
