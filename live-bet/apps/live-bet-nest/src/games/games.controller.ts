import { GameDTO } from '@live-bet/dto';
import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { BookmakerGuard } from '../auth/bookmaker.role.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Game } from './game.entity';
import { GamesService } from './games.service';

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

    @UseGuards(JwtAuthGuard, BookmakerGuard)
    @Post()
    create(@Body() game: GameDTO): Promise<Game> {
        return this.gamesService.create(game);
    }

    @Put(':id')
    update(@Param('id', new ParseIntPipe()) id: number, @Body() game: GameDTO): Promise<Game> {
        return this.gamesService.update(id, game);
    }

    @UseGuards(JwtAuthGuard, BookmakerGuard)
    @Delete(':id')
    remove(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return this.gamesService.remove(id);
    }
}
