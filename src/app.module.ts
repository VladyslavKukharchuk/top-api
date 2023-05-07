import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from '@api/auth/auth.module';
import { PageModule } from '@api/page/page.module';
import { ProductModule } from '@api/product/product.module';
import { ReviewModule } from '@api/review/review.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '@common/config/mongo.config';
import { FilesModule } from './api/files/files.module';
import { SitemapModule } from './api/sitemap/sitemap.module';
import { TelegramModule } from './api/telegram/telegram.module';
import { getTelegramConfig } from '@common/config/telegram.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({ useFactory: getMongoConfig }),
    AuthModule,
    PageModule,
    ProductModule,
    ReviewModule,
    FilesModule,
    SitemapModule,
    TelegramModule.forRootAsync({
      useFactory: getTelegramConfig,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
