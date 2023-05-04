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
import { FindTopPageDto } from './dto/find-top-page.dto';
import { JwtAuthGuard } from '@common/guards/jwt.guard';
import { IdValidationPipe } from '@common/pipes/id-validation.pipe';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@UseGuards(JwtAuthGuard)
@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.topPageService.findById(id);
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    return this.topPageService.findByAlias(alias);
  }

  @Post()
  async find(@Body() dto: FindTopPageDto) {
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
    @Body() dto: CreateTopPageDto,
  ) {
    return this.topPageService.updateById(id, dto);
  }
}
