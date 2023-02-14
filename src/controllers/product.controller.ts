import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Put,
  Delete,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CategoryService } from '@/services/category.service';
import { ProductService } from '@/services/product.service';
import { Product } from '@/schemas/product.schema';
import {
  CreateNewProduct,
  CreateNewProductSchema,
  UpdateProduct,
  UpdateProductSchema,
} from '@/pipes/product.pipe';
import { Response } from '@/interceptors';

@ApiTags('product')
@Controller('product')
@UseInterceptors(CacheInterceptor)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}
  @Get('/all')
  async findAll(): Promise<Response<Product[]>> {
    return { data: await this.productService.findAll() };
  }

  @Get('/search/:text')
  async search(@Param('text') text: string): Promise<Response<Product[]>> {
    return { data: await this.productService.search(text) };
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Response<Product>> {
    if (!Types.ObjectId.isValid(id)) return { error: 'Invalid Id' };
    return { data: await this.productService.findById(id) };
  }

  @Get('/category/:id')
  async findByCategoryId(
    @Param('id') id: string,
  ): Promise<Response<Product[]>> {
    if (!Types.ObjectId.isValid(id)) return { error: 'Invalid category Id' };
    const categoryExist = await this.categoryService.findById(id);

    if (categoryExist) {
      return { data: await this.productService.findByCategoryId(id) };
    } else {
      return { error: 'Category is not exist' };
    }
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string): Promise<Response<boolean>> {
    if (!Types.ObjectId.isValid(id)) return { error: 'Invalid Id' };
    const result = await this.productService.deleteById(id);
    if (!result) {
      return { error: `Error in deleting ${id}` };
    } else {
      return {};
    }
  }

  @Post()
  @ApiBody({
    required: true,
    description: 'Create a new product',
    schema: CreateNewProductSchema,
  })
  async create(@Body() body: CreateNewProduct): Promise<Response<Product>> {
    if (!Types.ObjectId.isValid(body.category)) {
      return { error: 'Invalid category Id' };
    }

    const categoryExist = await this.categoryService.findById(body.category);
    if (categoryExist) {
      return { data: await this.productService.create(body) };
    } else {
      return { error: 'Category is not exist' };
    }
  }

  @Put('/:id')
  @ApiBody({
    required: true,
    description: 'Update a product',
    schema: UpdateProductSchema,
  })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateProduct,
  ): Promise<Response<boolean>> {
    if (!Types.ObjectId.isValid(id)) return { error: 'Invalid Id' };
    if (!Types.ObjectId.isValid(body.category))
      return { error: 'Invalid category Id' };

    const categoryExist = await this.categoryService.findById(body.category);
    const productExist = await this.productService.findById(id);

    if (!categoryExist) {
      return { error: 'Category not exist' };
    }

    if (!productExist) {
      return { error: 'Product not exist' };
    }

    if (categoryExist && productExist) {
      const result = await this.productService.updateById(id, body);
      if (!result) {
        return { error: `Error in updating ${id}` };
      } else {
        return {};
      }
    }
  }
}
