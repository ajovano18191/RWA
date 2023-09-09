import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Subgame from './subgame.model';
import { Repository } from 'typeorm';

@Injectable()
export class SubgamesService {
    constructor(
        @InjectRepository(Subgame)
        private subgamesRepository: Repository<Subgame>,
    ) {}

    findAll(): Promise<Subgame[]> {
        return this.subgamesRepository.find();
    }

    findOne(id: number): Promise<Subgame | null> {
        return this.subgamesRepository.findOneBy({ id });
    } 

    create(subgame: Subgame): Promise<Subgame> {
        return this.subgamesRepository.save(subgame);
    }

    async update(id: number, subgame: Subgame): Promise<Subgame> {
        return this.subgamesRepository.save(subgame);
    }

    async remove(id: number): Promise<void> {
        await this.subgamesRepository.delete(id);
    }
}
