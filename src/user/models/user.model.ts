import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { SkillRelationModel } from 'src/skill/models/skill.model';
import { IUserSkill } from 'src/user-skill/interfaces/user.interface';

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

  @Field(() => [SkillRelationModel], { nullable: true })
  userSkills: IUserSkill[];
}

@ObjectType()
export class UserRealtionModel {
  @Field({ nullable: true })
  id: number;
  @Field({ nullable: true })
  user: UserModel;
}
@ObjectType()
export class UserModelSafe extends OmitType(UserModel, ['activationCode']) {}
