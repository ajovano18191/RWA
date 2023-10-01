import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { LiveModule } from '../live/live.module';
import { MatchesModule } from '../matches/matches.module';
import { Event } from './event.entity';
import { Ticket } from './ticket.entity';
import { TicketController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Event]), LiveModule, MatchesModule, AuthModule,],
  controllers: [TicketController],
  providers: [TicketsService],
})
export class TicketsModule {}
