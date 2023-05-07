import { IsEnum } from 'class-validator';
import { TopLevelCategory } from '../enum/top-level-category.enum';

export class FindPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;
}
