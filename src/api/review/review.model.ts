import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document, Types } from 'mongoose';
import { Product } from '../product/product.model';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Review extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number })
  rating: number;

  @Prop({ type: Types.ObjectId, ref: Product.name })
  productId: Product;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
