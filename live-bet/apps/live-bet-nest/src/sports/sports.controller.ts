import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SportsService } from './sports.service';
import { Sport, SportDTO } from 'libs/dto/src';

@Controller('sports')
export class SportsController {
    @Inject()
    sportsService: SportsService;

    @Get()
    findAll(): Promise<Sport[]> {
        return this.sportsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Sport> {
        return this.sportsService.findOne(id);
    }

    @Post()
    create(@Body() sport: SportDTO): Promise<Sport> {
        return this.sportsService.create(sport);
    }

    @Put(':id')
    update(@Param('id', new ParseIntPipe()) id: number, @Body() sport: SportDTO): Promise<Sport> {
        return this.sportsService.update(id, sport);
    }

    @Delete(':id')
    remove(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return this.sportsService.remove(id);
    }
}
