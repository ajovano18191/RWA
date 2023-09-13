import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameDTO } from '@live-bet/dto';
import { SportsService } from '../sports/sports.service';
import { Game } from './game.entity';
import { Subgame } from '../subgames/subgame.entity';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Game)
        private gamesRepository: Repository<Game>,
        @Inject(SportsService)
        private sportsService: SportsService,
    ) {}

    findAll(): Promise<Game[]> {
        return this.gamesRepository.find();
    }

    findOne(id: number): Promise<Game | null> {
        return this.gamesRepository.findOneBy({ id });
    } 

    async create(gameDTO: GameDTO): Promise<Game> {
        const game: Game = this.gamesRepository.create();
        game.name = gameDTO.name;
        game.sport = await this.sportsService.findOne(gameDTO.sportId);
        game.subgames = gameDTO.subgames.map(p => new Subgame(p.name, game));
        const newGame = await this.gamesRepository.save(game);
        newGame.subgames.forEach(subgame => subgame.game = undefined);
        return newGame;
    }

    async update(id: number, gameDTO: GameDTO): Promise<Game> {
        const game: Game = await this.findOne(id);
        game.name = gameDTO.name;
        game.sport = await this.sportsService.findOne(gameDTO.sportId);
        game.subgames = gameDTO.subgames.map(p => new Subgame(p.name, game));
        const newGame = await this.gamesRepository.save(game);
        newGame.subgames.forEach(subgame => subgame.game = undefined);
        return newGame;
        
    }

    async remove(id: number): Promise<void> {
        const game: Game = await this.findOne(id);
        await this.gamesRepository.remove(game);
    }
}
