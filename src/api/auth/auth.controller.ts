import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: AuthDto) {
    return this.authService.createUser(body);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() body: AuthDto) {
    const { email } = await this.authService.validateUser(body);
    return this.authService.login(email);
  }
}
