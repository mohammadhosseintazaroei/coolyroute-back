import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'auth model' })
export class AuthModel {
  @Field(() => ID)
  id: string;

  @Directive('@upper')
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field(() => [String])
  ingredients?: string[];
}
@ObjectType({ description: 'Login Verfification ' })
export class LoginVerification {
  @Field(() => Number)
  status: number;

  @Field(() => String)
  message: string;
}

@ObjectType({ description: 'User Verify ' })
export class UserVeify {
  @Field(() => Number)
  status: number;

  @Field(() => String)
  message: string;

  @Field(() => String, { nullable: true })
  access_token?: string;
}
