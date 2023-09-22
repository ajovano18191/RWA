import { MatchDTO, MatchOfferDTO } from '@live-bet/dto';
import { EventStatus, MatchStatus } from '@live-bet/enums';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../tickets/event.entity';
import { Match } from './match.entity';
import { Odds } from './odds.entity';

@Injectable()
export class MatchesService {
    constructor(
        @InjectRepository(Match)
        private matchesRepository: Repository<Match>,
        @InjectRepository(Odds)
        private oddsesRepository: Repository<Odds>,
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>,
    ) {}

    findAll(): Promise<Match[]> {
        return this.matchesRepository.find({
            relations: {
                oddses: true,
            },
            where: {
                status: MatchStatus.notStarted,
            }
        });
    }

    async findOne(id: number): Promise<Match | null> {
        return await this.matchesRepository
        .createQueryBuilder("match")
        .where("match.id = :id", {id})
        .leftJoinAndSelect("match.oddses", "odds")
        .getOne();
    } 

    async create(matchDTO: MatchDTO): Promise<Match> {
        const match: Match = this.matchesRepository.create();
        match.league = matchDTO.league;
        match.home = matchDTO.home;
        match.guest = matchDTO.guest;
        match.sportId = matchDTO.sportId;
        return this.matchesRepository.save(match);
    }

    async update(id: number, matchDTO: MatchDTO): Promise<Match> {
        const match: Match = await this.findOne(id);
        match.league = matchDTO.league;
        match.home = matchDTO.home;
        match.guest = matchDTO.guest;
        match.sportId = matchDTO.sportId;
        return this.matchesRepository.save(match);
    }

    async updateOffer(matchOfferDTO: MatchOfferDTO): Promise<Match> {
        let match: Match = await this.findOne(matchOfferDTO.matchId);
        await this.oddsesRepository.delete({ matchId: match.id });
        const promiseOddses = matchOfferDTO.offers.map(async offer => ({
            matchId: match.id,
            subgameId: offer[0],
            value: offer[1],
        }) as Odds);
        match.oddses = await Promise.all(promiseOddses);
        match = await this.matchesRepository.save(match);
        return match;
    }

    getMatchesOffer(): Map<number, MatchOfferDTO> {
        const completeOffer = new Map<number, MatchOfferDTO>();        
        this.matchesRepository.find({
            relations: {
                oddses: true,
            },
        }).then(matches => {
            matches.forEach(match => {
                const matchOfferDTO = {
                    sportId: match.sportId,
                    matchId: match.id,
                    offers: match.oddses.map(odds => [odds.subgameId, odds.value])
                } as MatchOfferDTO;
                completeOffer.set(match.id, matchOfferDTO);
            })
        });
        return completeOffer;
    }

    async remove(id: number): Promise<void> {
        await this.oddsesRepository.delete({ matchId: id });
        const match = await this.findOne(id);
        await this.matchesRepository.remove(match);
    }

    async startMatch(matchOfferDTO: MatchOfferDTO): Promise<Match> {
        const match: Match = await this.updateOffer(matchOfferDTO);
        await this.changeLiveStatus(match, MatchStatus.live);
        return match;
    }

    async endMatch(id: number, winnerSubgameIds: number[]): Promise<void> {
        const match = await this.matchesRepository
            .createQueryBuilder("match")
            .where({ id })
            .leftJoinAndSelect("match.events", "event")
            .getOne();

        const setWinnerSubgameIds: Set<number> = new Set<number>(winnerSubgameIds);
        match.events.forEach(event => {
            if(setWinnerSubgameIds.has(event.subgameId)) {
                event.status = EventStatus.winner;
            }
            else {
                event.status = EventStatus.loser;
            }
        });

        await this.eventsRepository.save(match.events);
        await this.changeLiveStatus(match, MatchStatus.finished);
    }

    private async changeLiveStatus(match: Match, status: MatchStatus): Promise<void> {
        match.status = status;
        await this.matchesRepository.save(match);
    }
}
