import { Injectable } from '@nestjs/common';
import { Review } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { NotFoundException } from '@common/exceptions';
import ReviewRepository from './review.repository';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    return this.reviewRepository.create(dto);
  }

  async findByProductId(productId: string): Promise<Review[]> {
    const products = await this.reviewRepository.findByProductId(productId);

    if (!products.length) {
      throw new NotFoundException('No review with this ProductId was found');
    }

    return products;
  }

  // async deleteByProductId(
  //   productId: string,
  // ): Promise<{ deletedCount: number }> {
  //   const deleted = await this.reviewModel.deleteMany({ productId });
  //
  //   if (!deleted.deletedCount) {
  //     throw new NotFoundException('No review with this ProductId was found');
  //   }
  //
  //   return deleted;
  // }
  async delete(id: string): Promise<{ deletedCount: number }> {
    const deleted = await this.reviewRepository.delete(id);

    if (!deleted.deletedCount) {
      throw new NotFoundException('No review with this id was found');
    }

    return deleted;
  }
}
