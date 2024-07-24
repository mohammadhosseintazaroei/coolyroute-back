import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import e from 'express';

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

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  activationCode?: string;
}
@ObjectType()
export class UserModelSafe extends OmitType(UserModel, ['activationCode']) {}
