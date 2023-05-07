import { Injectable } from '@nestjs/common';
import { Page, PageDocument } from './page.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePageDto } from './dto/create-page.dto';
@Injectable()
export default class PageRepository {
  constructor(@InjectModel(Page.name) private pageModel: Model<PageDocument>) {}

  async create(page): Promise<Page> {
    return this.pageModel.create(page);
  }

  async findById(id: string): Promise<Page> {
    return this.pageModel.findById(id);
  }

  async findAll(): Promise<Page[]> {
    return this.pageModel.find();
  }

  async findByAlias(alias: string): Promise<Page> {
    return await this.pageModel.findOne({ alias });
  }

  async findByCategory(firstCategory) {
    return this.pageModel
      .aggregate()
      .match({
        firstCategory,
      })
      .group({
        _id: { secondCategory: '$secondCategory' },
        pages: {
          $push: {
            alias: '$alias',
            title: '$title',
            _id: '$_id',
            category: '$category',
          },
        },
      });
  }

  async findByText(text: string) {
    return this.pageModel.find({
      $text: { $search: text, $caseSensitive: false },
    });
  }

  async update(id: string, dto: CreatePageDto): Promise<Page> {
    return this.pageModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async delete(id: string): Promise<{ deletedCount: number }> {
    return await this.pageModel.deleteOne({ _id: id });
  }
}
