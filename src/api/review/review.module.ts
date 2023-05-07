import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './review.model';
import { ReviewService } from './review.service';
import { TelegramModule } from '@api/telegram/telegram.module';
import ReviewRepository from './review.repository';

@Module({
  controllers: [ReviewController],
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    TelegramModule,
  ],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
