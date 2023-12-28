import { Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../models/user.model';
import { UsersService } from '../users.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private service: UsersService) {}

  @Query(() => [UserModel])
  async getAllUsers(): Promise<UserModel[]> {
    const users = await this.service.findAllUsers();
    return users;
  }
}
