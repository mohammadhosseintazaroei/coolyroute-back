import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  phoneNumber: string;

  @Field()
  email?: string;

  @Field({ nullable: true })
  activationCode?: string;
}
