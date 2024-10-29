import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IOrderItems } from '../interface/order-item.interface';
import { IOrder } from '../interface/order.interface';
import { OrderModel } from './order.model';

@ObjectType()
export class OrderItemModel implements IOrderItems {
  @Field(() => Int)
  id: number;
  @Field(() => Int)
  quantity: number;
  @Field(() => Int)
  price: number;
  @Field(() => OrderModel)
  order: IOrder;
}

@InputType()
export class OrderItemInput {
  @Field(() => Int)
  ticketId: number;

  @Field(() => Int)
  quantity: number;
}
