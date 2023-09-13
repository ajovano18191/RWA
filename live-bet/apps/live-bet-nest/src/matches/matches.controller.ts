import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchDTO } from 'libs/dto/src';
import { Match } from './match.entity';

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

    @Get(':id/start')
    startMatch(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return this.matchesService.startMatch(id);
    }

    @Get(':id/end')
    endMatch(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return this.matchesService.endMatch(id);
    }

    @Delete(':id')
    remove(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return this.matchesService.remove(id);
    }
}
