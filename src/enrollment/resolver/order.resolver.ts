import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from '../order.service';
import { OrderEntity } from '../entities/order.entity';
import { CreateOrderInput, OrderModel } from '../models/order.model';
import { GQLAuth } from 'src/auth/auth.decorator';
import { RoleType } from 'src/auth/roles.enum';
import { CurrentUser } from 'src/decorators/get-current-user.decorator';

@Resolver('Auth')
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query(() => [OrderModel])
  async getAllOrders(): Promise<OrderModel[]> {
    return await this.orderService.getAllOrders();
  }
  @GQLAuth(RoleType.normal)
  @Mutation(() => OrderModel)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @CurrentUser() user,
  ): Promise<OrderEntity> {
    console.log(user);
    return this.orderService.createOrder(user.id, createOrderInput.items);
  }
}
