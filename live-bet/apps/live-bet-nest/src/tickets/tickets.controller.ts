import { TicketDTO } from '@live-bet/dto';
import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WorkerGuard } from '../auth/worker.role.guard';
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
    create(@Body() ticket: TicketDTO, @Request() req: any): Promise<Ticket> {
        return this.ticketsService.create(ticket);
    }

    @UseGuards(JwtAuthGuard, WorkerGuard)
    @Post('/worker')
    workerCreate(@Body() ticket: TicketDTO, @Request() req: any): Promise<Ticket> {
        return this.ticketsService.create(ticket, req.user?.email);
    }

    @Put(':id')
    update(@Param('id', new ParseIntPipe()) id: number, @Body() ticket: TicketDTO): Promise<Ticket> {
        return this.ticketsService.update(id, ticket);
    }

    @UseGuards(JwtAuthGuard, WorkerGuard)
    @Put(':id/pay-in')
    async payIn(@Param('id', new ParseIntPipe()) id: number, @Body() body: any): Promise<boolean> {
        return await this.ticketsService.payIn(id, body.stake);
    }

    @UseGuards(JwtAuthGuard, WorkerGuard)
    @Get(':id/pay-out')
    async payOut(@Param('id', new ParseIntPipe()) id: number): Promise<number> {
        return await this.ticketsService.payOut(id);
    }

    @Delete(':id')
    remove(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return this.ticketsService.remove(id);
    }
}
