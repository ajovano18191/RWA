import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { Match, MatchDTO } from 'libs/dto/src';

@Controller('matches')
export class MatchesController {
    @Inject()
    matchesService: MatchesService;

    @Get()
    findAll(): Promise<Match[]> {
        return this.matchesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Match> {
        return this.matchesService.findOne(id);
    }

    @Post()
    create(@Body() game: MatchDTO): Promise<Match> {
        return this.matchesService.create(game);
    }

    @Put(':id')
    update(@Param('id', new ParseIntPipe()) id: number, @Body() game: MatchDTO): Promise<Match> {
        return this.matchesService.update(id, game);
    }

    @Delete(':id')
    remove(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return this.matchesService.remove(id);
    }
}