import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from './category.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: String,
    default: 'SAR',
  })
  currency: string;

  @Prop({
    type: String,
    required: true,
    ref: 'Category',
  })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
