import { MatchDTO, MatchOfferDTO } from '@live-bet/dto';
import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { BookmakerGuard } from '../auth/bookmaker.role.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Match } from './match.entity';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
    @Inject()
    matchesService: MatchesService;

    @Get()
    findAll(): Promise<Match[]> {
        return this.matchesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Match> {
        return await this.matchesService.findOne(id);
    }
    
    @UseGuards(JwtAuthGuard, BookmakerGuard)
    @Post()
    create(@Body() game: MatchDTO): Promise<Match> {
        return this.matchesService.create(game);
    }

    @Put(':id')
    update(@Param('id', new ParseIntPipe()) id: number, @Body() game: MatchDTO): Promise<Match> {
        return this.matchesService.update(id, game);
    }

    @UseGuards(JwtAuthGuard, BookmakerGuard)
    @Put(':id/offer')
    async updateOffer(@Body() matchOfferDTO: MatchOfferDTO): Promise<Match> {
        return await this.matchesService.updateOffer(matchOfferDTO);
    }

    @UseGuards(JwtAuthGuard, BookmakerGuard)
    @Put(':id/end-match')
    async endMatch(@Param('id', new ParseIntPipe()) id: number, @Body() winnerSubgames: number[]): Promise<void> {
        await this.matchesService.endMatch(id, winnerSubgames);
    }

    @Delete(':id')
    remove(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return this.matchesService.remove(id);
    }
}
