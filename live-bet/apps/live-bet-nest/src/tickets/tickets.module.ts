import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LiveModule } from '../live/live.module';
import { Event } from './event.entity';
import { TicketController } from './tickets.controller';
import { Ticket } from './ticket.entity';
import { TicketsService } from './tickets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Event]), LiveModule,],
  controllers: [TicketController],
  providers: [TicketsService],
})
export class TicketsModule {}
