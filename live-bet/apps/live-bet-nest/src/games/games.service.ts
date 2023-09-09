import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Game from './game.model';
import { Repository } from 'typeorm';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Game)
        private gamesRepository: Repository<Game>,
    ) {}

    findAll(): Promise<Game[]> {
        return this.gamesRepository.find();
    }

    findOne(id: number): Promise<Game | null> {
        return this.gamesRepository.findOneBy({ id });
    } 

    create(game: Game): Promise<Game> {
        return this.gamesRepository.save(game);
    }

    async update(id: number, game: Game): Promise<Game> {
        return this.gamesRepository.save(game);
    }

    async remove(id: number): Promise<void> {
        await this.gamesRepository.delete(id);
    }
}
