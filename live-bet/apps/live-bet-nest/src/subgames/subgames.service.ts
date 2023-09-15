import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubgameDTO } from '@live-bet/dto';
import { Repository } from 'typeorm';
import { GamesService } from '../games/games.service';
import { Subgame } from './subgame.entity';

@Injectable()
export class SubgamesService {
    constructor(
        @InjectRepository(Subgame)
        private subgamesRepository: Repository<Subgame>,
        @Inject(GamesService)
        private gamesService: GamesService,
    ) {}

    findAll(): Promise<Subgame[]> {
        return this.subgamesRepository.find();
    }

    findOne(id: number): Promise<Subgame | null> {
        return this.subgamesRepository.findOneBy({ id });
    } 

    async create(subgameDTO: SubgameDTO): Promise<Subgame> {
        const subgame: Subgame = this.subgamesRepository.create();
        subgame.name = subgameDTO.name;
        // subgame.game = await this.gamesService.findOne(subgameDTO.gameId);
        return this.subgamesRepository.save(subgame);
    }

    async update(id: number, subgameDTO: SubgameDTO): Promise<Subgame> {
        const subgame: Subgame = await this.subgamesRepository.findOneBy({ id });
        subgame.name = subgameDTO.name;
        // subgame.game = await this.gamesService.findOne(subgameDTO.gameId);
        return this.subgamesRepository.save(subgame);
    }

    async remove(id: number): Promise<void> {
        const subgame: Subgame = await this.subgamesRepository.findOneBy({ id });
        await this.subgamesRepository.remove(subgame);
    }
}
