import { TicketDTO } from '@live-bet/dto';
import { EventStatus, MatchStatus, TicketStatus } from '@live-bet/enums';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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

    async findOne(id: number): Promise<Ticket | null> {
        return await this.ticketsRepository
        .createQueryBuilder("ticket")
        .where("ticket.id = :id", { id })
        .leftJoinAndSelect("ticket.events", "event")
        .getOne();
    } 

    async create(ticketDTO: TicketDTO, userId: string | undefined = undefined): Promise<Ticket> {
        const ticket: Ticket = this.ticketsRepository.create();
        ticket.stake = ticketDTO.stake;
        if(userId) {
            ticket.status = TicketStatus.paidIn;
        }
        else {
            ticket.status = TicketStatus.payInEnabled;
        }
        ticket.events = [];

        for(let oddsKey of ticketDTO.events) {
            let match = await this.matchesService.findOne(oddsKey.matchId);
            let oddsValue: number = 1;
            if(match.status === MatchStatus.live) {
                if(!userId) {
                    throw new UnauthorizedException();
                }
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
        ticket.stake = ticketDTO.stake;   
        await this.ticketsRepository.save(ticket);
        return ticket; 
    }

    async payIn(id: number, stake: number): Promise<boolean> {
        const ticket: Ticket | null = await this.findOne(id);
        if(ticket === null) {
            return false;
        }

        ticket.stake = stake;

        if(ticket.status === TicketStatus.payInEnabled) {
            const isStarted = ticket.events.some(event => event.status !== EventStatus.notFinished);
            console.log(isStarted);
            if(isStarted) {
                ticket.status = TicketStatus.payInDisabled;
            }
            else {
                ticket.status = TicketStatus.paidIn;
            }
        }
        await this.ticketsRepository.save(ticket);
        return ticket.status === TicketStatus.paidIn;
    }

    async payOut(id: number): Promise<number> {
        const ticket: Ticket = await this.findOne(id);
        let stake: number = 0;
        if(ticket.status === TicketStatus.paidIn || ticket.status === TicketStatus.winner) {
            const isWinner = !(ticket.events.some(event => event.status !== EventStatus.winner));
            if(isWinner) {
                ticket.status = TicketStatus.paidOut;
                stake = ticket.stake;
            }
            else {
                ticket.status = TicketStatus.loser;
            }
            await this.ticketsRepository.save(ticket);    
        }
        return stake;
    }

    async remove(id: number): Promise<void> {
        await this.eventsRepository.delete({ ticketId: id });
        const ticket: Ticket = await this.findOne(id);
        await this.ticketsRepository.remove(ticket);
    }
}
