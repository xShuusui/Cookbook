# Cookbook App

[![version](https://img.shields.io/badge/version-1.0.0-green?style=flat-square)](.)
[![docker-compose](https://img.shields.io/badge/docker--compose-3.6-orange?style=flat-square)](https://docs.docker.com/compose/)
[![typescript](https://img.shields.io/badge/typescript-3.9.2-orange?style=flat-square)](https://www.typescriptlang.org/)
[![react](https://img.shields.io/badge/react-16.13.1-orange?style=flat-square)](https://reactjs.org/)
[![api](https://img.shields.io/badge/api-cookbook-blue?style=flat-square)](https://code.fbi.h-da.de/istjusege/fwe-ss20-755304-ha1)
[![Framework](https://img.shields.io/badge/framework-ant_design-blue.svg?style=flat-square)](https://ant.design/)
[![License](https://img.shields.io/badge/License-MIT-brown.svg?style=flat-square)](LICENSE)

This repository contains my cookbook app from the advanced web development homework.

## Basic

### CSS Framework

I have used ant design to design this website.

### Semi-Responsive

### Extra Features

-   Unit
-   Success/Error messages
-   Sort by calories and fat

## Pages

Here you can find detailed descriptions for each page in this app.

### Dashboard Page

**Accessible over ("/")**

The dashboard is the main page of this app. It lists all recipes with their rating, calories and fat. Also it shows the created and updated time of the recipe. Each recipe has an edit button, from where you come to the detailed recipe page and a delete button. At the top of the dashboard is a toolbar, there you can create a new recipe, and imediatly add ingredients too it. If the ingredient does not exist you can create it during the recipe creation. In the toolbar you can sort the recipes for a specific field and filter them for a specific ingredient or multiple ratings.

### Detailed Recipe Page

**Accessible over ("/recipe/:recipeId")**

You can press the edit button of an recipe in the dashboard to come here. On the recipe page you can edit the recipe. In one section you can edit the name, instructions and the rating. In an other section you can edit the ingredients inside the recipe or delete them. Also you can add new ingredients to the recipe with an amount and an unit. When your ingredient does not exist, you can directly create it.
On the bottem you can see the calories and fat from the whole recipe, besides a joke.

### Ingredient Page

**Accessible over ("/ingredient")**

The ingredient page shows all existing ingredients with their created and updated time. Here you can delete ingredients, edit ingredients and create new ingredients.

## License

**MIT**

Copyright (c) 2020, Julian Segeth

All rights reserved.
