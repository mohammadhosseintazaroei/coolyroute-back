// enrollment.model.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IEvent } from 'src/events/interfaces/event.interface';
import { EventModel } from 'src/events/models/event.model';
import { ISKill } from 'src/skill/interfaces/skill.interface';
import { SkillModel } from 'src/skill/models/skill.model';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserModel } from 'src/user/models/user.model';

@ObjectType()
export class EnrollmentModel {
  @Field({ nullable: true })
  id: number;

  @Field(() => UserModel, { nullable: true })
  user: IUser;

  @Field(() => EventModel, { nullable: true })
  event: IEvent;
}
