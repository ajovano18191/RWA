import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SubgamesService } from './subgames.service';
import Subgame from './subgame.model';

@Controller('subgames')
export class SubgamesController {
    @Inject()
    subgamesService: SubgamesService;

    @Get()
    findAll(): Promise<Subgame[]> {
        return this.subgamesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Subgame> {
        return this.subgamesService.findOne(id);
    }

    @Post()
    create(@Body() subgame: Subgame): Promise<Subgame> {
        return this.subgamesService.create(subgame);
    }

    @Put(':id')
    update(@Param('id', new ParseIntPipe()) id: number, @Body() subgame: Subgame): Promise<Subgame> {
        return this.subgamesService.update(id, subgame);
    }

    @Delete(':id')
    remove(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return this.subgamesService.remove(id);
    }
}
