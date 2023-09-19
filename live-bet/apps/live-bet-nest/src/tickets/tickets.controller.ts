import { TicketDTO } from '@live-bet/dto';
import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Ticket } from './ticket.entity';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketController {
    @Inject()
    ticketsService: TicketsService;

    @Get()
    findAll(): Promise<Ticket[]> {
        return this.ticketsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Ticket> {
        return this.ticketsService.findOne(id);
    }

    @Post()
    create(@Body() ticket: TicketDTO): Promise<Ticket> {
        return this.ticketsService.create(ticket);
    }

    @Put(':id')
    update(@Param('id', new ParseIntPipe()) id: number, @Body() ticket: TicketDTO): Promise<Ticket> {
        return this.ticketsService.update(id, ticket);
    }

    @Delete(':id')
    remove(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return this.ticketsService.remove(id);
    }
}
