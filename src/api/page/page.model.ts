import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import { TopLevelCategory } from './enum/top-level-category.enum';

export type PageDocument = HydratedDocument<Page>;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  _id: false,
})
export class TopPageAdvantage extends Document {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;
}

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Page extends Document {
  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop({ type: String })
  secondCategory: string;

  @Prop({ type: String, unique: true })
  alias: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  category: string;

  @Prop({ type: () => [TopPageAdvantage] })
  advantages: TopPageAdvantage[];

  @Prop({ type: String })
  seoText: string;

  @Prop({ type: String })
  tagsTitle: string;

  @Prop({ type: () => [String] })
  tags: string[];

  createdAt: Date;

  updatedAt: Date;
}

export const PageSchema = SchemaFactory.createForClass(Page);

PageSchema.index({ seoText: 'text', title: 'text' });
