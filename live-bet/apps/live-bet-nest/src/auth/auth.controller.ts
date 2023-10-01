import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BookmakerGuard } from './bookmaker.role.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local.auth.guard';
import { WorkerGuard } from './worker.role.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() user: { username: string, password: string, }) {
        return await this.authService.register(user.username, user.password);
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
