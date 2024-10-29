import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from './entities/order-item.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './order.service';
import { OrderResolver } from './resolver/order.resolver';
import { EventTicketEntity } from 'src/events/entities/event-ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, EventTicketEntity]),
  ],
  providers: [OrderResolver, OrderService],
})
export class EnrollmentModule {}
