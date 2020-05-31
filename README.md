# Cookbook App

[![version](https://img.shields.io/badge/version-1.0.0-green?style=flat-square)](.)
[![docker-compose](https://img.shields.io/badge/docker--compose-3.6-orange?style=flat-square)](https://docs.docker.com/compose/)
[![typescript](https://img.shields.io/badge/typescript-3.9.2-orange?style=flat-square)](https://www.typescriptlang.org/)
[![react](https://img.shields.io/badge/react-16.13.1-orange?style=flat-square)](https://reactjs.org/)
[![formik](https://img.shields.io/badge/formik-2.1.4-orange?style=flat-square)](https://jaredpalmer.com/formik/)
[![api](https://img.shields.io/badge/api-cookbook-blue?style=flat-square)](https://code.fbi.h-da.de/istjusege/fwe-ss20-755304-ha1)
[![Framework](https://img.shields.io/badge/framework-ant_design-blue.svg?style=flat-square)](https://ant.design/)
[![License](https://img.shields.io/badge/License-MIT-brown.svg?style=flat-square)](LICENSE)

This repository contains my cookbook app and the extended cookbook api from the advanced web development homework.

## Good to Know

Here are some useful information and features of this application.

### CSS Framework

I have used a framwork called ant design to design this website.

### Semi Responsive

This website is responsive on tablets, laptops and computers. The only component that is not responsive on smartphones is the menu.

### Form Handling

To process the whole user input and for its validation i have used formik with yup.

### Extra Features

#### Status messages

When an user has successfully created, edited or deleted something, the app displays a success message that is sent from the api. When an 400 or 404 error occurs the app displays an error message that is sent from the api. For all other errors that occur the status code and the status text are displayed.

#### Sort and filter by

On the dashboard page you have a dropdown menu to sort all recipes by name, rating, calories, fat, newest and last edited. You can filter the recipes according to their ingredients and additionally there is a dropdown menu where you can select multiple ratings and filter after them.

## Setup the System

This app and api are fully dockerized, to get the system running you need to have `docker` version `19.0+` and `docker-compose` version `18.02.0+` installed on your system.

First we need to pull all needed images with:

```
docker-compose build
```

Second we need to start all defined containers with:

```
docker-compose up
```

After all container are started, the app runs on port 3000.

## Pages

Here you can find detailed descriptions for each page in this app.

### Dashboard Page

**Accessible over ("/")**

The dashboard is the main page of this app. It lists all recipes with their rating, calories and fat. Also it shows the created and updated time of the recipe. Each recipe has an edit button, from where you come to the detailed recipe page and a delete button to delete the recipe. At the top of the dashboard is a toolbar, there you can create a new recipe, and immediatly add ingredients to it. If the ingredient does not exist you can create it during the recipe creation. In the toolbar you can sort the recipes according to a specific field and filter them for a specific ingredient or multiple ratings.

### Detailed Recipe Page

**Accessible over ("/recipe/:recipeId")**

You need to press the edit button of an recipe in the dashboard to come here. On the recipe page you can edit the recipe. In one section you can edit the name, the cooking instructions and the rating. In an other section you can edit the ingredients inside the recipe or delete them. Also you can add new ingredients to the recipe with an amount and an unit. When your ingredient does not exist, you can directly create it.
At the top of the page is a button that you can use to delete the current recipe and it redirect you immediatly to the dashboard page.
On the bottem of the page you can see the calories and fat from the whole recipe, with a funny food joke.

### Ingredient Page

**Accessible over ("/ingredient")**

The ingredient page shows all existing ingredients with their created and updated time. To geht their you must be click in the menu on "Ingredients". Each ingredient has an edit button where you can change its name. Also it has an delete button to delete the ingredient and deletes it from all recipes it is in. At the top of the page is a create button, their you can create a new ingredient.

## License

**MIT**

Copyright (c) 2020, Julian Segeth

All rights reserved.
