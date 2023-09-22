import { TicketDTO } from '@live-bet/dto';
import { MatchStatus, TicketType } from '@live-bet/enums';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LiveService } from '../live/live.service';
import { MatchesService } from '../matches/matches.service';
import { Event } from './event.entity';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket)
        private ticketsRepository: Repository<Ticket>,
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>,
        @Inject(LiveService)
        private liveService: LiveService,
        @Inject(MatchesService)
        private matchesService: MatchesService,
    ) {}

    findAll(): Promise<Ticket[]> {
        return this.ticketsRepository.find();
    }

    findOne(id: number): Promise<Ticket | null> {
        return this.ticketsRepository.findOneBy({ id });
    } 

    async create(ticketDTO: TicketDTO): Promise<Ticket> {
        const ticket: Ticket = this.ticketsRepository.create();
        ticket.type = ticketDTO.type;
        ticket.stake = ticketDTO.stake;
        ticket.events = [];

        for(let oddsKey of ticketDTO.events) {
            let match = await this.matchesService.findOne(oddsKey.matchId);
            let oddsValue: number = 1;
            if(match.status === MatchStatus.live) {
                oddsValue = this.liveService.getOdds(oddsKey);
            }
            else if(match.status === MatchStatus.notStarted) {
                oddsValue = match.oddses.find(odds => odds.subgameId === oddsKey.subgameId).value;
                
            }
            ticket.events.push(new Event(ticket.id, match.id, oddsKey.subgameId, oddsValue));
        }
        
        return await this.ticketsRepository.save(ticket);
    }

    async update(id: number, ticketDTO: TicketDTO): Promise<Ticket> {
        const ticket: Ticket = await this.findOne(id);
        ticket.type = ticketDTO.type;
        ticket.stake = ticketDTO.stake;
        if(ticketDTO.type === TicketType.live) {
            ticket.events = ticketDTO.events.map(p => new Event(ticket.id, p.matchId, p.subgameId, this.liveService.getOdds(p)));
        }        await this.ticketsRepository.save(ticket);
        return ticket; 
    }

    async remove(id: number): Promise<void> {
        await this.eventsRepository.delete({ ticketId: id });
        const ticket: Ticket = await this.findOne(id);
        await this.ticketsRepository.remove(ticket);
    }
}
