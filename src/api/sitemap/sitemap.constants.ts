import { TopLevelCategory } from '@api/page/enum/top-level-category.enum';

type RouteMapType = Record<TopLevelCategory, string>;

export const CATEGORY_URL: RouteMapType = {
  [TopLevelCategory.COURSES]: '/courses',
  [TopLevelCategory.SERVICES]: '/services',
  [TopLevelCategory.BOOKS]: '/books',
  [TopLevelCategory.PRODUCTS]: '/products',
};
