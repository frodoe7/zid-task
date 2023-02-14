## Description

Simple store task for Zid company
built with NestJS

## Running with Docker

```bash
$ docker-compose up -d --build
```

## Swagger Docs

navigate to http://localhost:3000/api to view the swagger docs

![swagger Docs](https://i.imgur.com/XyhJEOh.png)

## What's included

11 services divided into 2 groups

**Product services**

- **GET /product/all** > fetch all the products
- **GET /product/search/{text}** > search in the products
- **GET /product/{id}** > return a product details by its id
- **DELETE /product/{id}** > delete a product by its id
- **PUT /product/{id}** > update a product by its id
- **GET /product/category/{id}** > get all products in specific category
- **POST /product** > create a new product

**Category services**

- **GET /category/all** > fetch all categories
- **DELETE /category/{id}** > delete a category by its id
- **PUT /category/{id}** > update a category by its id
- **POST /category** > create a new category
