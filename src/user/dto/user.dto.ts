import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CompleteFurtherInformationDto {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  firstName: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  lastName?: string;

  @IsNumber()
  @IsDefined()
  @Field(() => Int)
  skillId?: number;
}
