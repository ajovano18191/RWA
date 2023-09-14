import { SportDTO } from '@live-bet/dto';
import { MatchStatus, OfferType } from '@live-bet/enums';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sport } from './sport.entity';

@Injectable()
export class SportsService {
    constructor(
        @InjectRepository(Sport)
        private sportsRepository: Repository<Sport>,
    ) {}

    async findAll(offerType: OfferType): Promise<Sport[]> {
        return await this.sportsRepository
        .createQueryBuilder("sport")
        .leftJoinAndSelect("sport.matches", "match", `match.status IN (:...statuses)`, { statuses: this.offerType2MatchStatuses(offerType), })
        .leftJoinAndSelect("sport.games", "game")
        .leftJoinAndSelect("game.subgames", "subgame")
        .getMany();
    }

    private offerType2MatchStatuses(offerType: OfferType) {
        let statuses: string[] = [];
        switch(offerType) {
            case OfferType.noLive: 
                statuses = [MatchStatus.notStarted];
                break;
            case OfferType.live:
                statuses = [MatchStatus.live];
                break;
            case OfferType.all:
                statuses = [MatchStatus.notStarted, MatchStatus.live];
                break;
        }
        return statuses;
    }

    findOne(id: number): Promise<Sport | null> {
        return this.sportsRepository.findOneBy({ id });
    } 

    create(sportDTO: SportDTO): Promise<Sport> {
        const sport: Sport = this.sportsRepository.create();
        sport.name = sportDTO.name;
        return this.sportsRepository.save(sport);
    }

    async update(id: number, sportDTO: SportDTO): Promise<Sport> {
        const sport: Sport = await this.sportsRepository.findOneBy({ id });
        sport.name = sportDTO.name;
        return this.sportsRepository.save(sport);
    }

    async remove(id: number): Promise<void> {
        const sport: Sport = await this.sportsRepository.findOneBy({ id });
        await this.sportsRepository.remove(sport);
    }
}
