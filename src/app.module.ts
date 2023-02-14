import { Module, CacheModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { Category, CategorySchema } from '@/schemas/category.schema';
import { Product, ProductSchema } from '@/schemas/product.schema';

import { CategoryController } from '@/controllers/category.controller';
import { ProductController } from '@/controllers/product.controller';

import { CategoryService } from '@/services/category.service';
import { ProductService } from '@/services/product.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      ttl: 30,
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [CategoryController, ProductController],
  providers: [CategoryService, ProductService],
})
export class AppModule {}
