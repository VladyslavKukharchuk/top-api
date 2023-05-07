import { Injectable } from '@nestjs/common';
import { Review, ReviewDocument } from '@api/review/review.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export default class ReviewRepository {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(review): Promise<Review> {
    return this.reviewModel.create(review);
  }

  async findByProductId(productId: string): Promise<Review[]> {
    return this.reviewModel.find({ productId: productId });
  }

  async delete(id: string): Promise<{ deletedCount: number }> {
    return await this.reviewModel.deleteOne({ _id: id });
  }
}
