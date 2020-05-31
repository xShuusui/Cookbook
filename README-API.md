# Cookbook Api

[![version](https://img.shields.io/badge/version-1.0.0-green?style=flat-square)](.)
[![docker-compose](https://img.shields.io/badge/docker--compose-3.6-orange?style=flat-square)](https://docs.docker.com/compose/)
[![typescript](https://img.shields.io/badge/typescript-3.8.3-orange?style=flat-square)](https://www.typescriptlang.org/)
[![typeorm](https://img.shields.io/badge/typeorm-0.2.24-orange?style=flat-square)](https://typeorm.io/#/)
[![mysql](https://img.shields.io/badge/mysql-5.7-orange?style=flat-square)](https://hub.docker.com/_/mysql)
[![nutritionix](https://img.shields.io/badge/api-nutritionix-blue?style=flat-square)](https://www.nutritionix.com/business/api)
[![spoonacular](https://img.shields.io/badge/api-spoonacular-blue?style=flat-square)](https://spoonacular.com/food-api)
[![license](https://img.shields.io/badge/license-MIT-brown.svg?style=flat-square)](LICENSE)

This repository contains my cookbook api from the advanced web development homework.

## Functionality

The Cookbook API is a REST API, where you can create different recipes and ingredients. Also you can assigne ingredients to different recipes. The whole Cookbook API is dockerized, it stores its data in a MySQL database using TypeORM, which is also dockerized. To communicate with this API you can use a REST interface.

### Basics

#### Recipe

A recipe has a name, a text with cooking instructions, a rating from 0 to 5 and a list of ingredients. Also it gets a random food joke from an external api.

#### Ingredient

An ingredient has a name.

#### RecipeIngredient

A recipeIngredient is the connection between a recipe and an ingredient, it has an amount and an unit. The unit can be: g, kg, ml, l, cup, teaspoon or tablespoon. Also it gets calories and fat from the given ingredient data from an external api.

### External APIs

#### Nutritionix

The nutritionix api gets a string with name, amount and unit from an ingredient, and it returns the calories and fat from the given ingredient data. The returned calories and fat are stored in the database.

This api can only be called 200 times per day.

#### Spoonacular

When creating a recipe, the spoonacular api is called. It returns a random food joke, which is stored in the database in a recipe.

Warning: The food jokes are 18+!

This api can only be called 150 times per day.

### Docker Secrets

I used docker secrets to manage all key files and transmit them into the docker container. I dont store unencrypted keys in any of my source code. I save all key files in one key folder, which i unfortunately must upload.

## Setup the System

This api is fully dockerized, to get the system running you need to have `docker` version `19.0+` and `docker-compose` version `18.02.0+` installed on your system.

First we need to pull all needed images with:

```
docker-compose build
```

Second we need to start all defined containers with:

```
docker-compose up
```

## REST Routes

Here you see an overview of all REST routes from this api.

### Recipe routes

| HTTP Verb | Route                 | Body                       | Returns (JSON)  |
| --------- | --------------------- | -------------------------- | --------------- |
| GET       | /api/recipe           | -                          | all recipes     |
| GET       | /api/recipe/:recipeId | -                          | a single recipe |
| POST      | /api/recipe           | name, instructions, rating | created recipe  |
| PATCH     | /api/recipe/:recipeId | name, instructions, rating | updated recipe  |
| DELETE    | /api/recipe/:recipeId | -                          | -               |

### Ingredient routes

| HTTP Verb | Route                         | Body | Returns (JSON)      |
| --------- | ----------------------------- | ---- | ------------------- |
| GET       | /api/ingredient               | -    | all ingredients     |
| GET       | /api/ingredient/:ingredientId | -    | a single ingredient |
| POST      | /api/ingredient               | name | created ingredient  |
| PATCH     | /api/ingredient/:ingredientId | name | updated ingredient  |
| DELETE    | /api/ingredient/:ingredientId | -    | -                   |

### RecipeIngredient routes

| HTTP Verb | Route                                          | Body         | Returns (JSON)                        |
| --------- | ---------------------------------------------- | ------------ | ------------------------------------- |
| POST      | /api/recipe/:recipeId/ingredient/:ingredientId | amount, unit | recipe with the added ingredient      |
| PATCH     | /api/recipe/:recipeId/ingredient/:ingredientId | amount, unit | recipe with the updated ingredient    |
| DELETE    | /api/recipe/:recipeId/ingredient/:ingredientId | -            | recipe without the deleted ingredient |

## How to test

My cookbook api can only be tested manually. To test it you need postman and the _api.postman_collection.json_ file of this repository.

### Postman

To import the _api.postman_collection.json_ in postman follow the steps:

1. Open postman
2. Click on import in the top left corner
3. Click on choose file and select the _api.postman_collection.json_ file of this repository

The collection is now imported and you see it on the left side. The api can now be tested by selecting a specific route and fill the body with data.

## License

**MIT**

Copyright (c) 2020, Julian Segeth

All rights reserved.
