import { Item } from "../types/Item"

export const checkItem = (itemName: string) => {
    return itemName in itemMap.keys()
}

export const getItem = (itemName: string) => {
    return itemMap.get(itemName)
}

export const getFilteredItemList = (itemName?: string) => {
    if (itemName === undefined)
        return itemList
    return itemList.filter(item => item.itemName.startsWith(itemName))
}

const itemList: Item[] = Array.from([
    {itemName: "피카츄", itemIcon: ""},
    {itemName: "라이츄", itemIcon: ""}
])

const itemMap = new Map<string, Item>(
    itemList.map(item => [item.itemName, item])
)
