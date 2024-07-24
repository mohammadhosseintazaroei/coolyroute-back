import { UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserModel, UserModelSafe } from '../models/user.model';
import { UserService } from '../user.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private service: UserService) {}

  @Query(() => [UserModel])
  async getAllUsers(): Promise<UserModel[]> {
    const users = await this.service.findAllUsers();
    return users;
  }

  @Query(() => UserModelSafe)
  @UseGuards(JwtAuthGuard)
  async userProfile(_, @Context() context): Promise<UserModelSafe> {
    const profile = await this.service.profile(context.req.user);
    return profile;
  }
}
