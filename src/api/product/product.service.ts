import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { NotFoundException } from '@common/exceptions';
import { FindProductDto } from '@api/product/dto/find-product.dto';
import { Review } from '@api/review/review.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(data: CreateProductDto): Promise<Product> {
    const {
      image,
      title,
      price,
      oldPrice,
      credit,
      advantages,
      disAdvantages,
      categories,
      tags,
      characteristics,
    } = data;

    const newProduct = new this.productModel({
      image,
      title,
      price,
      oldPrice,
      credit,
      advantages,
      disAdvantages,
      categories,
      tags,
      characteristics,
    });

    return newProduct.save();
  }

  async findById(id: string): Promise<Product> {
    const product = this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('No product with this id was found');
    }

    return product;
  }

  async delete(id: string): Promise<{ deletedCount: number }> {
    const deleted = await this.productModel.deleteOne({ _id: id });

    if (!deleted) {
      throw new NotFoundException('No product with this id was found');
    }

    return deleted;
  }

  async updateById(id: string, dto: CreateProductDto): Promise<Product> {
    const product = this.productModel.findByIdAndUpdate(id, dto, { new: true });

    if (!product) {
      throw new NotFoundException('No product with this id was found');
    }

    return product;
  }

  async findWithReviews(dto: FindProductDto) {
    const { category, limit } = dto;
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
