import { Item, Recipe } from "../types/Item";

export const findRecipe = (item: Item) => {
    return recipeList.get(item)
}

export const findItem = (item: Item) => {
    return item in itemList
}


export const recipeList = new Map<Item, Recipe>()

export const itemList: Item[] = Array.from(recipeList.keys())

