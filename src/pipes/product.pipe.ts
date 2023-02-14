import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  Min,
  Max,
  Matches,
} from 'class-validator';

export class CreateNewProduct {
  @IsString()
  @MinLength(8)
  @MaxLength(80)
  title: string;

  @IsString()
  @MinLength(8)
  @MaxLength(800)
  description: string;

  @IsNumber()
  @Min(1)
  @Max(9999)
  price: number;

  @IsString()
  @Matches(/^[0-9a-fA-F]{24}$/)
  category;
}

export class UpdateProduct {
  @IsString()
  @MinLength(8)
  @MaxLength(80)
  title: string;

  @IsString()
  @MinLength(8)
  @MaxLength(800)
  description: string;

  @IsNumber()
  @Min(1)
  @Max(9999)
  price: number;

  @IsString()
  @Matches(/^[0-9a-fA-F]{24}$/)
  category;
}

export const CreateNewProductSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 8,
      maxLength: 80,
    },
    description: {
      type: 'string',
      minLength: 8,
      maxLength: 800,
    },
    price: {
      type: 'number',
      min: 1,
      max: 9999,
    },

    category: {
      type: 'string',
      pattern: 'pattern: ^[0-9a-fA-F]{24}$',
    },
  },
};

export const UpdateProductSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 8,
      maxLength: 80,
    },
    description: {
      type: 'string',
      minLength: 8,
      maxLength: 800,
    },
    price: {
      type: 'number',
      min: 1,
      max: 9999,
    },

    category: {
      type: 'string',
      pattern: 'pattern: ^[0-9a-fA-F]{24}$',
    },
  },
};
