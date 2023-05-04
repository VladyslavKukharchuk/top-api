import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  _id: false,
})
export class ProductCharacteristic extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  value: string;
}

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Product extends Document {
  @Prop({ type: String })
  image: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number })
  oldPrice: number;

  @Prop({ type: Number })
  credit: number;

  @Prop({ type: Number })
  calculatedRating: number;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  advantages: string;

  @Prop({ type: String })
  disAdvantages: string;

  @Prop({ type: () => [String] })
  categories: string[];

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: () => [ProductCharacteristic] })
  characteristics: ProductCharacteristic[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
