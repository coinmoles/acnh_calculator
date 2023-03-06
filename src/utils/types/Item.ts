export type Item = string

export interface Ingredient {
    item: Item
    quantity: number
    DIYable: boolean
}

export interface Recipe {
    result: Item
    ingredientList: Ingredient[]
}