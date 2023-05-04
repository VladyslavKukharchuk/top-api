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

@UseGuards(JwtAuthGuard)
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  async create(@Body() body: CreateReviewDto) {
    return await this.reviewService.create(body);
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
