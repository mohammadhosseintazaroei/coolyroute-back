import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';
import { EventTicketEntity } from 'src/events/entities/event-ticket.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { OrderStatus } from './interface/order.interface';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private repo: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private orderItemRepo: Repository<OrderItemEntity>,
    @InjectRepository(EventTicketEntity)
    private ticketRepo: Repository<EventTicketEntity>,
  ) {}
  async createOrder(
    userId: number,
    items: { ticketId: number; quantity: number }[],
  ): Promise<OrderEntity> {
    const userOrder = await this.repo.find({
      where: { userId: userId, status: OrderStatus.PENDING },
    });
    if (userOrder.length) {
      throw new BadRequestException('you have alreader a pending order');
    }
    const order = new OrderEntity();
    order.userId = userId;
    order.date = new Date();
    order.total = 0;

    order.items = await Promise.all(
      items.map(async (itemData) => {
        const ticket = await this.ticketRepo.findOne({
          where: { id: itemData.ticketId },
        });
        if (!ticket || ticket.availableQuantity < itemData.quantity) {
          throw new Error('Ticket not available or insufficient quantity');
        }

        const orderItem = new OrderItemEntity();
        orderItem.ticket = ticket;
        orderItem.quantity = itemData.quantity;
        orderItem.price = ticket.price * itemData.quantity;
        order.total += orderItem.price;

        // کاهش موجودی بلیت‌ها
        // ticket.availableQuantity -= itemData.quantity; // i wanteed to coment it to test
        await this.ticketRepo.save(ticket);

        return orderItem;
      }),
    );
    await this.orderItemRepo.save(order.items);
    await this.repo.save(order);

    return order;
  }
  async getAllOrders(): Promise<OrderEntity[]> {
    const m = await this.repo.find({ relations: { items: true } });
    console.log(m.map((i) => i.items));
    return m;
  }
}
