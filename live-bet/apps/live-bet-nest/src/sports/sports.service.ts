import { Injectable } from '@nestjs/common';
import Sport from './sport.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SportsService {
    constructor(
        @InjectRepository(Sport)
        private sportsRepository: Repository<Sport>,
    ) {}

    findAll(): Promise<Sport[]> {
        return this.sportsRepository.find();
    }

    findOne(id: number): Promise<Sport | null> {
        return this.sportsRepository.findOneBy({ id });
    } 

    create(sport: Sport): Promise<Sport> {
        return this.sportsRepository.save(sport);
    }

    async update(id: number, sport: Sport): Promise<Sport> {
        return this.sportsRepository.save(sport);
    }

    async remove(id: number): Promise<void> {
        await this.sportsRepository.delete(id);
    }
}
