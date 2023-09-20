import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

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
        return "Radi all";
    }

    @UseGuards(JwtAuthGuard)
    @Get('authorized')
    authorized() {
        return "Radi authorized";
    }
}
