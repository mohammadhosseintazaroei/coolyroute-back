import { Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../models/user.model';
import { UserService } from '../user.service';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private service: UserService) {}

  @Query(() => [UserModel])
  async getAllUsers(): Promise<UserModel[]> {
    const users = await this.service.findAllUsers();
    return users;
  }
}
