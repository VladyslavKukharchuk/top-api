import { Controller, Get, Header } from '@nestjs/common';
import { PageService } from '@api/page/page.service';
import { format, subDays } from 'date-fns';
import { Builder } from 'xml2js';
import { CATEGORY_URL } from '@api/sitemap/sitemap.constants';

@Controller('sitemap')
export class SitemapController {
  domain: string;
  constructor(private readonly topPageService: PageService) {
    this.domain = process.env.DOMAIN || '';
  }

  @Get('xml')
  @Header('content-type', 'text/xml')
  async sitemap() {
    const formatString = "yyyy-MM-dd'T'HH:mm:00.000xxx";
    const res = [
      {
        loc: this.domain,
        lastmod: format(subDays(new Date(), 1), formatString),
        changefreq: 'daily',
        priority: '1.0',
      },
      {
        loc: `${this.domain}/courses`,
        lastmod: format(subDays(new Date(), 1), formatString),
        changefreq: 'daily',
        priority: '1.0',
      },
    ];

    const pages = await this.topPageService.findAll();

    const pageRes = pages.map((page) => {
      return {
        loc: `${this.domain}${CATEGORY_URL[page.firstCategory]}/${page.alias}`,
        lastmod: format(
          subDays(new Date(page.updatedAt ?? new Date()), 1),
          formatString,
        ),
        changefreq: 'weekly',
        priority: '0.7',
      };
    });

    const result = res.concat(pageRes);

    const builder = new Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' },
    });
    return builder.buildObject({
      urlset: {
        $: {
          xmlns: 'https://www.sitemaps.org./schemas/sitemap/0.9',
        },
        url: result,
      },
    });
  }
}
