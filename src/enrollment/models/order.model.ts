// enrollment.model.ts
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { OrderEntity } from '../entities/order.entity';
import { OrderItemInput, OrderItemModel } from './order-item.model';
import { IOrder } from '../interface/order.interface';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserModel } from 'src/user/models/user.model';
import { IOrderItems } from '../interface/order-item.interface';

@ObjectType()
export class OrderModel implements IOrder {
  @Field({ nullable: true })
  id: number;
  @Field({ nullable: true })
  userId: number;
  @Field({ nullable: true })
  date: Date;
  @Field({ nullable: true })
  total: number;
  @Field(() => UserModel)
  user: IUser;

  @Field(() => [OrderItemModel])
  items: IOrderItems[];
}

@InputType()
export class CreateOrderInput {
  @Field(() => [OrderItemInput])
  items: OrderItemInput[];
}
