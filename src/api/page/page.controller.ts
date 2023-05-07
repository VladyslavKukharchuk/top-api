import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FindPageDto } from './dto/find-page.dto';
import { JwtAuthGuard } from '@common/guards/jwt.guard';
import { IdValidationPipe } from '@common/pipes/id-validation.pipe';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';

@UseGuards(JwtAuthGuard)
@Controller('page')
export class PageController {
  constructor(private readonly topPageService: PageService) {}
  @Post('create')
  async create(@Body() dto: CreatePageDto) {
    return this.topPageService.create(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.topPageService.findById(id);
  }

  @Get()
  async getAll() {
    return this.topPageService.findAll();
  }

  @Get('alias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    return this.topPageService.findByAlias(alias);
  }

  @Get('find/:firstCategory')
  async find(@Param() dto: FindPageDto) {
    return this.topPageService.findByCategory(dto);
  }

  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    return this.topPageService.findByText(text);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.topPageService.delete(id);
  }

  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreatePageDto,
  ) {
    return this.topPageService.update(id, dto);
  }
}
