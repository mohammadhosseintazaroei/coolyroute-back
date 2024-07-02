import { Module } from '@nestjs/common';
import { EventResolver } from './resolver/event.resolver';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [TypeOrmModule.forFeature([EventEntity]), ConfigModule],
  providers: [EventResolver, EventService],
  exports: [
    EventService,
    TypeOrmModule.forFeature([EventEntity]),
    ConfigModule,
  ],
})
export class EventModule {}
