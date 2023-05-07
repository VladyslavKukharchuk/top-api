import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import UserRepository from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(email: string, passwordHash: string): Promise<User> {
    console.log(email);
    return this.userRepository.create({ email, passwordHash });
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
