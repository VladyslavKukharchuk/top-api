import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from './page.model';
import { PageService } from './page.service';
import PageRepository from './page.repository';

@Module({
  controllers: [PageController],
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
  ],
  providers: [PageService, PageRepository],
  exports: [PageService],
})
export class PageModule {}
