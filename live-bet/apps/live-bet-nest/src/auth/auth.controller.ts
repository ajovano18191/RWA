import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './role.guard';
import { BookmakerGuard } from './bookmaker.role.guard';
import { WorkerGuard } from './worker.role.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('login')
    async login(@Body() user: { email: string, password: string, }) {
        return await this.authService.login(user);
    }

    @Post('register')
    async register(@Body() user: { email: string, password: string, }) {
        return await this.authService.register(user.email, user.password);
    }

    @Get('all')
    all() {
        return {
            res: "Radi all",
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('authorized')
    authorized() {
        return {
            res: "Radi authorized",
        };
    }

    @UseGuards(JwtAuthGuard, BookmakerGuard)
    @Get('bookmaker')
    bookamker(@Request() req: any) {
        return {
            res: "Radi bookamker",
        };
    }

    @UseGuards(JwtAuthGuard, WorkerGuard)
    @Get('worker')
    worker() {
        return {
            res: "Radi worker",
        };
    }
}
