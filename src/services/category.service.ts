import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '@/schemas/category.schema';
import { CreateNewCategory, UpdateCategory } from '@/pipes/category.pipe';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(newCategory: CreateNewCategory): Promise<Category> {
    return this.categoryModel.create(newCategory);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find({}).exec();
  }

  async findById(_id: string): Promise<Category> {
    return this.categoryModel.findOne({ _id }).exec();
  }

  async deleteById(_id: string): Promise<boolean> {
    const result = await this.categoryModel.deleteOne({ _id }).exec();
    return result.deletedCount === 1;
  }

  async findByName(name: string): Promise<Category> {
    return this.categoryModel.findOne({ name }).exec();
  }

  async updateById(
    _id: string,
    updatedCategory: UpdateCategory,
  ): Promise<boolean> {
    const result = await this.categoryModel
      .updateOne({ _id }, updatedCategory)
      .exec();

    return result.modifiedCount === 1;
  }

  // Only for testing purpose
  async clearCategories() {
    await this.categoryModel.deleteMany({});
  }
}
