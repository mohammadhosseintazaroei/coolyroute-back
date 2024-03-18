import { Field, ObjectType } from '@nestjs/graphql';
import { IEthResponse } from '../types/response.interface';

@ObjectType({ description: 'Eth Response' })
export class EthResponse implements IEthResponse {
  @Field(() => Number)
  status: number;

  @Field(() => String)
  message: string;
}
