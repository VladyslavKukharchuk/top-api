import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from '@api/product/product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
@Injectable()
export default class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(product): Promise<Product> {
    return this.productModel.create(product);
  }

  async findById(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async delete(id: string): Promise<{ deletedCount: number }> {
    return await this.productModel.deleteOne({ _id: id });
  }

  async update(id: string, dto: CreateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async findWithReviews(category: string, limit: number) {
    return this.productModel.aggregate([
      {
        $match: {
          categories: category,
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'Review',
          localField: '_id',
          foreignField: 'productId',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          reviewCount: { $size: '$reviews' },
          reviewAvg: { $avg: '$review.rating' },
          reviews: {
            body:
              'function (reviews) {' +
              'reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))' +
              'return reviews;' +
              '}',
            args: ['$reviews'],
            lang: 'js',
          },
        },
      },
    ]);
  }
}
