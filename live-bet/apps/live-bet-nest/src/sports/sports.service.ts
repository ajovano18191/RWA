import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SportDTO } from 'libs/dto/src';
import { Sport } from './sport.entity';

@Injectable()
export class SportsService {
    constructor(
        @InjectRepository(Sport)
        private sportsRepository: Repository<Sport>,
    ) {}

    findAll(offerType: string): Promise<Sport[]> {
        let arr: string[] = [];
        switch(offerType) {
            case 'not-started': 
                arr = ['not-started'];
                break;
            case 'live':
                arr = ['live'];
                break;
            case 'all':
                arr = ['not-started', 'live'];
                break;
        }
        return this.sportsRepository.find({
            relations: {
                games: {
                    subgames: true,
                },
                matches: true,
            },
            where: {
                matches: {
                    status: In(arr),
                },
            },
        });
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
