import { Injectable } from '@nestjs/common';
import { User } from '@api/user/user.model';
import { AuthDto } from './dto/auth.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import {
  ConflictException,
  NotFoundException,
  AuthException,
} from '@common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@api/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(dto: AuthDto): Promise<User> {
    const { login, password } = dto;

    const oldUser = await this.userService.findByEmail(login);

    if (oldUser) {
      throw new ConflictException('User with this email is already exist');
    }

    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);

    return this.userService.create(login, passwordHash);
  }

  async validate(dto: AuthDto): Promise<Pick<User, 'email'>> {
    const { login, password } = dto;

    const user = await this.userService.findByEmail(login);
    console.log(user);
    if (!user) {
      throw new NotFoundException('No user with this email was found');
    }

    const isCorrectPassword = await compare(password, user.passwordHash);

    if (!isCorrectPassword) {
      throw new AuthException('Invalid password');
    }

    return { email: user.email };
  }

  async login(dto: AuthDto) {
    const { email } = await this.validate(dto);
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
