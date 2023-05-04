import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type TopPageDocument = HydratedDocument<TopPage>;

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  _id: false,
})
export class HhData extends Document {
  @Prop({ type: Number })
  count: number;

  @Prop({ type: Number })
  juniorSalary: number;

  @Prop({ type: Number })
  middleSalary: number;

  @Prop({ type: Number })
  seniorSalary: number;
}

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
export class TopPage extends Document {
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

  @Prop({ type: HhData, required: false })
  hh?: HhData;

  @Prop({ type: () => [TopPageAdvantage] })
  advantages: TopPageAdvantage[];

  @Prop({ type: String })
  seoText: string;

  @Prop({ type: String })
  tagsTitle: string;

  @Prop({ type: () => [String] })
  tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPage);

TopPageSchema.index({ seoText: 'text', title: 'text' });
