import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { NotFoundException } from '@common/exceptions';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(data: CreateReviewDto): Promise<Review> {
    const { name, title, description, rating, productId } = data;
    const newReview = new this.reviewModel({
      name,
      title,
      description,
      rating,
      productId,
    });
    return newReview.save();
  }

  async delete(id: string): Promise<{ deletedCount: number }> {
    const deleted = await this.reviewModel.deleteOne({ _id: id });

    if (!deleted) {
      throw new NotFoundException('No review with this id was found');
    }

    return deleted;
  }

  async findByProductId(productId: string): Promise<Review[]> {
    const products = await this.reviewModel.find({ productId: productId });

    if (!products.length) {
      throw new NotFoundException('No review with this ProductId was found');
    }

    return products;
  }

  async deleteByProductId(
    productId: string,
  ): Promise<{ deletedCount: number }> {
    const deleted = await this.reviewModel.deleteMany({ productId });

    if (!deleted) {
      throw new NotFoundException('No review with this ProductId was found');
    }

    return deleted;
  }
}
