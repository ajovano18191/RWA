
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findOne(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ email });
  }

  async create(email: string, password: string): Promise<User> {
    const user = this.usersRepository.create();
    user.email = email;
    user.password = password;
    return this.usersRepository.save(user);
  }
}
