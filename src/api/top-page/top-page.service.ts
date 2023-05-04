import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopLevelCategory, TopPage, TopPageDocument } from './top-page.model';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { NotFoundException } from '@common/exceptions';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPage.name) private topPageModel: Model<TopPageDocument>,
  ) {}

  async create(data: CreateTopPageDto): Promise<TopPage> {
    const {
      firstCategory,
      secondCategory,
      alias,
      title,
      category,
      hh,
      advantages,
      seoText,
      tagsTitle,
      tags,
    } = data;

    const newPage = new this.topPageModel({
      firstCategory,
      secondCategory,
      alias,
      title,
      category,
      hh,
      advantages,
      seoText,
      tagsTitle,
      tags,
    });
    return newPage.save();
  }

  async delete(id: string): Promise<{ deletedCount: number }> {
    const deleted = await this.topPageModel.deleteOne({ _id: id });

    if (!deleted) {
      throw new NotFoundException('No page with this id was found');
    }

    return deleted;
  }

  async findById(id: string): Promise<TopPage> {
    const page = await this.topPageModel.findById(id);

    if (!page) {
      throw new NotFoundException('No page with this Id was found');
    }

    return page;
  }

  async findByAlias(alias: string): Promise<TopPage> {
    const page = await this.topPageModel.findOne({ alias });

    if (!page) {
      throw new NotFoundException('No page with this Alias was found');
    }

    return page;
  }

  // async findByCategory(data: FindTopPageDto): Promise<TopPage[]> {
  //   const { firstCategory } = data;
  //   return this.topPageModel.find(
  //     { firstCategory },
  //     { alias: 1, secondCategory: 1, title: 1 },
  //   );
  // }

  async findByCategory(data: FindTopPageDto) {
    const { firstCategory } = data;
    return this.topPageModel
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
    return this.topPageModel.find({
      $text: { $search: text, $caseSensitive: false },
    });
  }

  async updateById(id: string, dto: CreateTopPageDto): Promise<TopPage> {
    const page = await this.topPageModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!page) {
      throw new NotFoundException('No page with this Id was found');
    }

    return page;
  }
}
