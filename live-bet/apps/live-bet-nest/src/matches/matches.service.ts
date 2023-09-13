import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchDTO } from '@live-bet/dto';
import { Repository } from 'typeorm';
import { SportsService } from '../sports/sports.service';
import { Match } from './match.entity';

@Injectable()
export class MatchesService {
    constructor(
        @InjectRepository(Match)
        private matchesRepository: Repository<Match>,
        @Inject(SportsService)
        private sportsService: SportsService,
    ) {}

    findAll(): Promise<Match[]> {
        return this.matchesRepository.find();
    }

    findOne(id: number): Promise<Match | null> {
        return this.matchesRepository.findOneBy({ id });
    } 

    async create(matchDTO: MatchDTO): Promise<Match> {
        const match: Match = this.matchesRepository.create();
        match.league = matchDTO.league;
        match.home = matchDTO.home;
        match.guest = matchDTO.guest;
        match.sport = await this.sportsService.findOne(matchDTO.sportId);
        return this.matchesRepository.save(match);
    }

    async update(id: number, matchDTO: MatchDTO): Promise<Match> {
        const match: Match = await this.findOne(id);
        match.league = matchDTO.league;
        match.home = matchDTO.home;
        match.guest = matchDTO.guest;
        match.sport = await this.sportsService.findOne(matchDTO.sportId);
        return this.matchesRepository.save(match);
    }

    async remove(id: number): Promise<void> {
        const match: Match = await this.findOne(id);
        await this.matchesRepository.remove(match);
    }

    async startMatch(id: number): Promise<void> {
        await this.changeLiveStatus(id, 'live');
    }

    async endMatch(id: number): Promise<void> {
        await this.changeLiveStatus(id, 'finished');
    }

    private async changeLiveStatus(id: number, status: string): Promise<void> {
        const match: Match = await this.findOne(id);
        match.status = status;
        await this.matchesRepository.save(match);
    }
}
