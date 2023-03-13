import { Item, Recipe } from "../types/Item";
import { getItem } from "./itemList";

export const findRecipe = (item: Item) => {
    return recipeList.get(item)
}


export const recipeList = new Map<Item, Recipe>([
    [getItem("피카츄")!, {result: getItem("피카츄")!, ingredientList: []}]
])

export const itemList: Set<Item> = new Set(recipeList.keys())

