import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from '@api/auth/auth.module';
import { TopPageModule } from '@api/top-page/top-page.module';
import { ProductModule } from '@api/product/product.module';
import { ReviewModule } from '@api/review/review.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '@common/config/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({ useFactory: getMongoConfig }),
    AuthModule,
    TopPageModule,
    ProductModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
