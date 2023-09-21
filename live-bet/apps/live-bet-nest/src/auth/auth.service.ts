import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    public jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if(user) {
      const isMatchs = await bcrypt.compare(pass, user.password);
      if(isMatchs) {
        const { password, ...result } = user;
        return result;
      }
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
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const user = await this.usersService.create(email, hashedPassword);
    return await this.login({
      email,
      password,
    });;
  }

  async findOneUser(email: string) {
    return await this.usersService.findOne(email);
  }
}
