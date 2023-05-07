import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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
    return this.productService.create(dto);
  }

  @Get('find')
  async find1(@Query() dto: FindProductDto) {
    dto.limit = +dto.limit;
    return this.productService.findWithReviews(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.productService.findById(id);
  }

  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() body: CreateProductDto,
  ) {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.productService.delete(id);
  }
}
