import { Injectable } from '@nestjs/common';
import { Page } from './page.model';
import { CreatePageDto } from './dto/create-page.dto';
import { NotFoundException } from '@common/exceptions';
import { FindPageDto } from './dto/find-page.dto';
import PageRepository from './page.repository';

@Injectable()
export class PageService {
  constructor(private readonly pageRepository: PageRepository) {}

  async create(dto: CreatePageDto): Promise<Page> {
    return this.pageRepository.create(dto);
  }

  async findById(id: string): Promise<Page> {
    const page = await this.pageRepository.findById(id);

    if (!page) {
      throw new NotFoundException('No page with this Id was found');
    }

    return page;
  }

  async findAll(): Promise<Page[]> {
    return this.pageRepository.findAll();
  }

  async findByAlias(alias: string): Promise<Page> {
    const page = await this.pageRepository.findByAlias(alias);

    if (!page) {
      throw new NotFoundException('No page with this Alias was found');
    }

    return page;
  }

  async findByCategory(data: FindPageDto) {
    const { firstCategory } = data;
    return this.pageRepository.findByCategory(firstCategory);
  }

  async findByText(text: string) {
    return this.pageRepository.findByText(text);
  }

  async update(id: string, dto: CreatePageDto): Promise<Page> {
    const page = await this.pageRepository.update(id, dto);

    if (!page) {
      throw new NotFoundException('No page with this Id was found');
    }

    return page;
  }

  async delete(id: string): Promise<{ deletedCount: number }> {
    const deleted = await this.pageRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException('No page with this id was found');
    }

    return deleted;
  }
}
