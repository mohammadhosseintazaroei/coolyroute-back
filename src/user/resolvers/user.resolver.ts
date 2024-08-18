import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GQLAuth } from 'src/auth/auth.decorator';
import { RoleType } from 'src/auth/roles.enum';
import { CompleteFurtherInformationDto } from '../dto/user.dto';
import { UserModel, UserModelSafe } from '../models/user.model';
import { UserService } from '../user.service';

@Resolver(() => UserModel)
@GQLAuth()
export class UserResolver {
  constructor(private service: UserService) {}

  @Query(() => [UserModel])
  async getAllUsers(): Promise<UserModel[]> {
    const users = await this.service.findAllUsers();
    return users;
  }

  @Query(() => UserModelSafe)
  @GQLAuth(RoleType.normal)
  async userProfile(_, @Context() context): Promise<UserModelSafe> {
    const profile = await this.service.profile(context.req.user);
    return profile;
  }

  @GQLAuth(RoleType.normal)
  @Mutation(() => Boolean)
  async completeFurtherInformation(
    @Args('data') input: CompleteFurtherInformationDto,
    @Context() context,
  ) {
    return this.service.completeFurtherInformation(context.req.user.id, input);
  }
}
