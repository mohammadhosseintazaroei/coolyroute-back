import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthModel } from '../models/auth.model';

@Resolver(() => AuthModel)
export class AuthResolver {
  @Query(() => AuthModel)
  async recipes(@Args('id') id: string): Promise<AuthModel> {
    return {
      id: id,
      title: '',
      description: 'DFAS',
      creationDate: new Date(),
    };
  }
}
