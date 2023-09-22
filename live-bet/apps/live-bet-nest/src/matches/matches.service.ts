import { MatchDTO, MatchOfferDTO } from '@live-bet/dto';
import { MatchStatus } from '@live-bet/enums';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportsService } from '../sports/sports.service';
import { SubgamesService } from '../subgames/subgames.service';
import { Match } from './match.entity';
import { Odds } from './odds.entity';

@Injectable()
export class MatchesService {
    constructor(
        @InjectRepository(Match)
        private matchesRepository: Repository<Match>,
        @InjectRepository(Odds)
        private oddsesRepository: Repository<Odds>,
        @Inject(SportsService)
        private sportsService: SportsService,
        @Inject(SubgamesService)
        private subgamesService: SubgamesService,
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

    findOne(id: number): Promise<Match | null> {
        return this.matchesRepository.findOneBy({ id });
    } 

    async create(matchDTO: MatchDTO): Promise<Match> {
        const match: Match = this.matchesRepository.create();
        match.league = matchDTO.league;
        match.home = matchDTO.home;
        match.guest = matchDTO.guest;
        match.sportId = matchDTO.sportId;
        // match.sport = await this.sportsService.findOne(matchDTO.sportId);
        return this.matchesRepository.save(match);
    }

    async update(id: number, matchDTO: MatchDTO): Promise<Match> {
        const match: Match = await this.findOne(id);
        match.league = matchDTO.league;
        match.home = matchDTO.home;
        match.guest = matchDTO.guest;
        match.sportId = matchDTO.sportId;
        // match.sport = await this.sportsService.findOne(matchDTO.sportId);
        return this.matchesRepository.save(match);
    }

    async updateOffer(matchOfferDTO: MatchOfferDTO): Promise<Match> {
        let match: Match = await this.findOne(matchOfferDTO.matchId);
        await this.oddsesRepository.delete({ matchId: match.id });
        const promiseOddses = matchOfferDTO.offers.map(async offer => ({
            matchId: match.id,
            subgameId: offer[0],//await this.subgamesService.findOne(offer[0]),
            value: offer[1],
        }) as Odds);
        match.oddses = await Promise.all(promiseOddses);
        match = await this.matchesRepository.save(match);
        return match;
    }

    getMatchesOffer(): Map<number, MatchOfferDTO> {
        const completeOffer = new Map<number, MatchOfferDTO>();        
        const matches = this.matchesRepository.find({
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

    async endMatch(match: Match): Promise<void> {
        await this.changeLiveStatus(match, MatchStatus.finished);
    }

    private async changeLiveStatus(match: Match, status: MatchStatus): Promise<void> {
        match.status = status;
        await this.matchesRepository.save(match);
    }
}
