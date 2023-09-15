import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { SportsService } from './sports.service';
import { SportDTO } from '@live-bet/dto';
import { Sport } from './sport.entity';
import { OfferType } from '@live-bet/enums';

@Controller('sports')
export class SportsController {
    @Inject()
    sportsService: SportsService;

    @Get()
    findAll(@Query('offerType') offerType: OfferType): Promise<Sport[]> {
        return this.sportsService.findAll(offerType);
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
