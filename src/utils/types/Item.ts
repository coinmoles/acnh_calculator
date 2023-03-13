export type Item = {
    itemName: string
    itemIcon: string
    obtainMethod?: string
    DIYable?: boolean
}

export interface ItemWithQuantity {
    item: Item
    quantity: number
}

export interface Recipe {
    result: Item
    ingredientList: ItemWithQuantity[]
}