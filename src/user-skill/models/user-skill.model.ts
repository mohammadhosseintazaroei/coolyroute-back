import { Field, ObjectType } from '@nestjs/graphql';
import { ISKill } from 'src/skill/interfaces/skill.interface';
import { SkillModel } from 'src/skill/models/skill.model';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserModel } from 'src/user/models/user.model';

@ObjectType()
export class UserSkillModel {
  @Field({ nullable: true })
  id: number;

  @Field(() => UserModel, { nullable: true })
  user: IUser;

  @Field(() => SkillModel, { nullable: true })
  skill: ISKill;
}
