import { ChevronLeftIcon, ChevronRightIcon, SmallCloseIcon } from "@chakra-ui/icons"
import { HStack, IconButton, Input, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import React from "react"
import { ItemWithQuantity } from "../../utils/types/Item"

export const SelectedItemTable = (props: {
  selectedItems: ItemWithQuantity[],
  setSelectedItems: React.Dispatch<React.SetStateAction<ItemWithQuantity[]>>
  removeSelectedItem: (item: ItemWithQuantity) => void
}) => {
  const { selectedItems, setSelectedItems, removeSelectedItem } = props

  const changeQuantitySelectedItem = (incrementedItemName: string, newQuantity: number) => {
    const quantityChanger = (result: ItemWithQuantity[], itemQ: ItemWithQuantity) => {
      if (itemQ.item.itemName === incrementedItemName){
        result.push({
          item: itemQ.item,
          quantity: newQuantity
        })
      }
      else
        result.push(itemQ)
      
      return result
    }

    setSelectedItems(selectedItems.reduce(quantityChanger, []))
  }

  return (
    <Table width="100%" textAlign={"center"}>
      <Thead>
        <Tr>
          <Th width="10%"></Th>
          <Th width="60%">아이템</Th>
          <Th width="20%">개수</Th>
          <Th width="10%"></Th>
        </Tr>
      </Thead>
      <Tbody>
        {selectedItems.map(itemQ => {
          return (
            <Tr>
              <Td></Td>
              <Td>{itemQ.item.itemName}</Td>
              <Td>
                <HStack>
                <IconButton 
                  variant="ghost" 
                  aria-label="decrease" 
                  onClick={() => {
                    if (itemQ.quantity > 1)
                      changeQuantitySelectedItem(itemQ.item.itemName, itemQ.quantity - 1)
                    else
                      removeSelectedItem(itemQ)
                  }}
                  icon={<ChevronLeftIcon />} 
                />
                <Input 
                  type="number"
                  textAlign="center"
                  variant="unstyled"
                  value={itemQ.quantity} 
                  onChange={(e) => {
                    changeQuantitySelectedItem(itemQ.item.itemName, Number(e.target.value))
                  }}
                  onBlur={() => {
                    if (itemQ.quantity === 0) {
                      removeSelectedItem(itemQ)
                    }
                  }}
                />
                <IconButton  
                  variant="ghost"
                  aria-label="increase" 
                  onClick={() => {
                    changeQuantitySelectedItem(itemQ.item.itemName, itemQ.quantity + 1)
                  }}
                  icon={<ChevronRightIcon />}
                />
                </HStack>
              </Td>
              <Td>
                  <IconButton 
                    colorScheme={"red"}
                    aria-label="delete"
                    onClick={() => {
                      removeSelectedItem(itemQ)
                    }}
                    icon={<SmallCloseIcon />}
                  />
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}