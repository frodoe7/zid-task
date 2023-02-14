import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateNewCategory {
  @IsString()
  @MinLength(2)
  @MaxLength(40)
  name: string;
}

export class UpdateCategory {
  @IsString()
  @MinLength(2)
  @MaxLength(40)
  name: string;
}

export const CreateNewCategorySchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 2,
      maxLength: 40,
    },
  },
};

export const UpdateCategorySchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 2,
      maxLength: 40,
    },
  },
};
