import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { GamesService } from './games.service';
import { GameDTO } from 'libs/dto/src';
import { Game } from './game.entity';

@Controller('games')
export class GamesController {
    @Inject()
    gamesService: GamesService;

    @Get()
    findAll(): Promise<Game[]> {
        return this.gamesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Game> {
        return this.gamesService.findOne(id);
    }

    @Post()
    create(@Body() game: GameDTO): Promise<Game> {
        return this.gamesService.create(game);
    }

    @Put(':id')
    update(@Param('id', new ParseIntPipe()) id: number, @Body() game: GameDTO): Promise<Game> {
        return this.gamesService.update(id, game);
    }

    @Delete(':id')
    remove(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return this.gamesService.remove(id);
    }
}
