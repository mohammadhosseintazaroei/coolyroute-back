import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { DataSource } from 'typeorm';
import { RoleType } from '../roles.enum';

export const Roles = Reflector.createDecorator<RoleType[]>();

@Injectable()
export class GQLMiddlewareGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    request.gqlFieldName = ctx.getInfo().fieldName;
    return true;
  }
}
