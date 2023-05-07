import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';
import { PageModule } from '@api/page/page.module';

@Module({
  imports: [PageModule],
  controllers: [SitemapController],
})
export class SitemapModule {}
