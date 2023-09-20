import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const validatedUser = await this.validateUser(user.email, user.password);
    if(!validatedUser) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      role: validatedUser.role,
    };
  }

  async register(email: string, password: string) {
    const user = await this.usersService.create(email, password);
    return await this.login({
      email,
      password,
    });
  }
}
