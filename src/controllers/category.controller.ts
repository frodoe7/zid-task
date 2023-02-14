import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CategoryService } from '@/services/category.service';
import { Category } from '@/schemas/category.schema';
import {
  CreateNewCategory,
  CreateNewCategorySchema,
  UpdateCategory,
  UpdateCategorySchema,
} from '@/pipes/category.pipe';
import { Response } from '@/interceptors';
import { ProductService } from '@/services/product.service';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
  ) {}
  @Get('/all')
  async findAll(): Promise<Response<Category[]>> {
    return { data: await this.categoryService.findAll() };
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string): Promise<Response<boolean>> {
    if (!Types.ObjectId.isValid(id)) return { error: 'Invalid Id' };
    const categoryHaveProducts = await this.productService.categoryHaveProducts(
      id,
    );

    if (categoryHaveProducts) {
      return { error: 'Not allowed! Category have products' };
    }

    const result = await this.categoryService.deleteById(id);
    if (!result) {
      return { error: `Error in deleting ${id}` };
    } else {
      return {};
    }
  }

  @Post()
  @ApiBody({
    required: true,
    description: 'Create a new category',
    schema: CreateNewCategorySchema,
  })
  async create(@Body() body: CreateNewCategory): Promise<Response<Category>> {
    const categoryExist = await this.categoryService.findByName(body.name);
    if (categoryExist) {
      return { error: 'Category exist with same name' };
    } else {
      return { data: await this.categoryService.create(body) };
    }
  }

  @Put('/:id')
  @ApiBody({
    required: true,
    description: 'Update a category',
    schema: UpdateCategorySchema,
  })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateCategory,
  ): Promise<Response<boolean>> {
    if (!Types.ObjectId.isValid(id)) return { error: 'Invalid Id' };

    const categoryExist = await this.categoryService.findById(id);

    if (categoryExist) {
      const result = await this.categoryService.updateById(id, body);
      if (!result) {
        return { error: `Error in updating ${id}` };
      } else {
        return {};
      }
    } else {
      return { error: 'Category is not exist' };
    }
  }
}
