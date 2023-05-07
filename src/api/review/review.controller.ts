import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from '@common/guards/jwt.guard';
import { UserEmail } from '@common/decorators/user-email.decorator';
import { IdValidationPipe } from '@common/pipes/id-validation.pipe';
import { TelegramService } from '@api/telegram/telegram.service';

@UseGuards(JwtAuthGuard)
@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly telegramService: TelegramService,
  ) {}

  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return await this.reviewService.create(dto);
  }

  @Post('notify')
  async notify(@Body() dto: CreateReviewDto) {
    const message = `Name: ${dto.name}\n
    + Title: ${dto.title}\n
    + Description: ${dto.description}\n
    + Rating:  ${dto.rating}\n
    + Product ID: ${dto.productId}\n`;

    return await this.telegramService.sendMessage(message);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return await this.reviewService.delete(id);
  }

  @Get(':productId')
  async getByProduct(
    @Param('productId') productId: string,
    @UserEmail() email: string,
  ) {
    console.log(email);
    return this.reviewService.findByProductId(productId);
  }
}
