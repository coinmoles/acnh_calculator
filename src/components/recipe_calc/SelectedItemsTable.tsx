import { ChevronLeftIcon, ChevronRightIcon, SmallCloseIcon } from "@chakra-ui/icons"
import { Box, HStack, IconButton, Input, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
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
      if (itemQ.item.itemName === incrementedItemName) {
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
    <Box>
      {selectedItems.length > 0 && (
        <Table 
          width="100%" 
          textAlign={"center"}
        >
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
                  <Td fontSize={{ base: 'sm', md: 'md' }}>{itemQ.item.itemName}</Td>
                  <Td>
                    <HStack>
                      <IconButton
                        display={{ base: 'none', md: 'flex' }}
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
                        fontSize={{ base: 'sm', md: 'md' }}
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
                        display={{ base: 'none', md: 'flex' }}
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
                      size={{ base: 'sm', md: 'md' }}
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
        </Table>)}
    </Box>
  )
}