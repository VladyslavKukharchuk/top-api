import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '@common/config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStratagy } from '@common/strategies/jwt.stratagy';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: getJwtConfig,
    }),
    PassportModule,
  ],
  providers: [AuthService, JwtStratagy],
})
export class AuthModule {}
