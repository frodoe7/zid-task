import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '@/schemas/product.schema';
import { CreateNewProduct, UpdateProduct } from '@/pipes/product.pipe';

@Injectable()
export class ProductService implements OnModuleInit {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  onModuleInit() {
    this.createIndexes();
  }

  // Create indexes
  async createIndexes() {
    await this.productModel.collection.createIndex({
      title: 'text',
      description: 'text',
    });
  }

  async create(newProduct: CreateNewProduct): Promise<Product> {
    return this.productModel.create(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find({}).sort({ thumbs: 1 }).exec();
  }

  async findById(_id: string): Promise<Product> {
    return this.productModel.findOne({ _id }).exec();
  }

  async findByCategoryId(category: string): Promise<Product[]> {
    return this.productModel.find({ category }).exec();
  }

  async categoryHaveProducts(category: string): Promise<boolean> {
    const result = await this.productModel.count({ category });
    return result >= 1;
  }

  async updateById(
    _id: string,
    updatedProduct: UpdateProduct,
  ): Promise<boolean> {
    const result = await this.productModel
      .updateOne({ _id }, updatedProduct)
      .exec();

    return result.modifiedCount === 1;
  }

  async deleteById(_id: string): Promise<boolean> {
    const result = await this.productModel.deleteOne({ _id }).exec();
    return result.deletedCount === 1;
  }

  async search(text: string): Promise<Product[]> {
    return this.productModel
      .find({ $text: { $search: text } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .lean()
      .exec();
  }

  // Only for testing purpose
  async clearProducts() {
    await this.productModel.deleteMany({});
  }
}
