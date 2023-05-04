import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Product } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { JwtAuthGuard } from '@common/guards/jwt.guard';
import { CreateProductDto } from '@api/product/dto/create-product.dto';
import { ProductService } from './product.service';
import { IdValidationPipe } from '@common/pipes/id-validation.pipe';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    console.log(dto);
    return this.productService.create(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.productService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.productService.delete(id);
  }

  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() body: CreateProductDto,
  ) {
    return this.productService.updateById(id, body);
  }

  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    return this.productService.findWithReviews(dto);
  }
}
