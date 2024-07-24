import { Field, ObjectType } from '@nestjs/graphql';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserModel, UserRealtionModel } from 'src/user/models/user.model';
@ObjectType()
export class SkillModel {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [UserRealtionModel], { nullable: true })
  users: IUser[];
}
@ObjectType()
export class SkillRelationModel {
  @Field({ nullable: true })
  id: number;

  @Field(() => SkillModel, { nullable: true })
  skill: SkillModel;
}
