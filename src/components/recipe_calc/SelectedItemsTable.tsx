import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import React from "react"
import { ItemWithQuantity } from "../../utils/types/Item"

export const SelectedItemTable = (props: {
  selectedItems: ItemWithQuantity[],
  setSelectedItems: React.Dispatch<React.SetStateAction<ItemWithQuantity[]>>
}) => {
  const { selectedItems, setSelectedItems } = props

  const changeQuantitySelectedItem = (incrementedItemName: string, quantityChange: 1 | -1) => {
    const quantityChanger = (result: ItemWithQuantity[], itemQ: ItemWithQuantity) => {
      if (itemQ.item.itemName === incrementedItemName){
        if (itemQ.quantity + quantityChange !== 0)
          result.push({
            item: itemQ.item,
            quantity: itemQ.quantity + quantityChange
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
          <Th width="30%">개수</Th>
        </Tr>
      </Thead>
      <Tbody>
        {selectedItems.map(itemQ => {
          return (
            <Tr>
              <Td></Td>
              <Td>{itemQ.item.itemName}</Td>
              <Td>
                <IconButton variant={"ghost"} aria-label="decrease" onClick={() => {changeQuantitySelectedItem(itemQ.item.itemName, -1)}} icon={<ChevronLeftIcon />} />
                {itemQ.quantity}
                <IconButton variant={"ghost"} aria-label="increase" onClick={() => {changeQuantitySelectedItem(itemQ.item.itemName, +1)}} icon={<ChevronRightIcon />} />
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}