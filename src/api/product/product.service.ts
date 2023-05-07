import { Injectable } from '@nestjs/common';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { NotFoundException } from '@common/exceptions';
import { FindProductDto } from '@api/product/dto/find-product.dto';
import ProductRepository from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(dto: CreateProductDto): Promise<Product> {
    return this.productRepository.create(dto);
  }

  async findById(id: string): Promise<Product> {
    const product = this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException('No product with this id was found');
    }

    return product;
  }

  async delete(id: string): Promise<{ deletedCount: number }> {
    const deleted = await this.productRepository.delete(id);

    if (!deleted.deletedCount) {
      throw new NotFoundException('No product with this id was found');
    }

    return deleted;
  }

  async update(id: string, dto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.update(id, dto);

    if (!product) {
      throw new NotFoundException('No product with this id was found');
    }

    return product;
  }

  async findWithReviews(dto: FindProductDto) {
    const { category, limit } = dto;
    return this.productRepository.findWithReviews(category, limit);
  }
}
