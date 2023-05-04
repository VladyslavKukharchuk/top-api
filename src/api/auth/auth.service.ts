import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';
import { AuthDto } from './dto/auth.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import {
  ConflictException,
  NotFoundException,
  AuthException,
} from '@common/exceptions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: AuthDto): Promise<User> {
    const { login, password } = dto;

    const oldUser = await this.findUser(login);
    if (oldUser) {
      throw new ConflictException('User with this email is already exist');
    }

    const salt = await genSalt(10);
    const newUser = new this.userModel();
    newUser.email = login;
    newUser.passwordHash = await hash(password, salt);
    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email });
  }

  async validateUser(dto: AuthDto): Promise<Pick<User, 'email'>> {
    const { login, password } = dto;

    const user = await this.findUser(login);
    if (!user) {
      throw new NotFoundException('No user with this email was found');
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new AuthException('Invalid password');
    }
    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
