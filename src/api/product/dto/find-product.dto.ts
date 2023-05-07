import { IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindProductDto {
  @IsString()
  category: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  limit: number;
}
