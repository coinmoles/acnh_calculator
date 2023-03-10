import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons"
import { Flex, IconButton, Input, InputGroup, InputRightElement, List, ListItem, Text } from "@chakra-ui/react"
import { useCombobox, useMultipleSelection } from "downshift"
import React, { forwardRef, useMemo, useRef, useState } from "react"
import { getFilteredItemList } from "../../utils/data/itemList"
import { Item, ItemWithQuantity } from "../../utils/types/Item"

const ComboboxInput = forwardRef<HTMLInputElement>((props, ref) => {
  return <Input {...props} ref={ref} />
})

const ComboboxList = forwardRef<HTMLUListElement, { isOpen: boolean, }>(({isOpen, ...props}, ref) => {
  return <List display={isOpen ? undefined : "none"} {...props} ref={ref}/>
})

const ComboboxItem = forwardRef<HTMLLIElement, { itemIndex: number, highlightedIndex: number }>(
  ({ itemIndex, highlightedIndex, ...props}, ref) => {
    return (
      <ListItem
        px={3}
        py={2}
        cursor="pointer"
        bg={itemIndex === highlightedIndex ? "teal.100" : undefined}
        {...props}
        ref={ref}
      />
    )
  }
)

export const SearchBar = (props: {
  selectedItems: ItemWithQuantity[],
  setSelectedItems: React.Dispatch<React.SetStateAction<ItemWithQuantity[]>>
}) => {
  const { selectedItems, setSelectedItems } = props
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null)
  const items = useMemo(
    () => getFilteredItemList(inputValue),
    [inputValue]
  )

  const checkSelected = (newSelectedItem: Item) => {
    return selectedItems.map(iwQ => iwQ.item).includes(newSelectedItem)
  }

  const addSelectedItem = (newSelectedItem: Item) => {
    setSelectedItems([...selectedItems, {
      item: newSelectedItem,
      quantity: 1
    }])
  }
  
  const {
    getSelectedItemProps,
    getDropdownProps,
    removeSelectedItem
  } = useMultipleSelection({
    selectedItems,
    onStateChange({selectedItems: newSelectedItems, type}) {
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          if (newSelectedItems)
            setSelectedItems(newSelectedItems)
          break
        default:
          break
      }
    }
  })

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem
  } = useCombobox({
    items,
    itemToString(item) {
      return item ? item.itemName : ""
    },
    defaultHighlightedIndex: 0,
    selectedItem: null,
    stateReducer(state, actionAndChanges) {
      const {changes, type} = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true,
            highlightedIndex: 0
          }
        default:
          return changes
      }
    },
    onStateChange({ inputValue: newInputValue, selectedItem: newSelectedItem, type }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem && !checkSelected(newSelectedItem)) {
              addSelectedItem(newSelectedItem)
          }
      }
    },
  })

  return (
    <Flex direction="column" alignItems="left">
      <Flex direction="row">
        <List>
          {selectedItems.map((iwQ => (
            <ListItem key={iwQ.item.itemName}>
              {iwQ.item.itemName}
            </ListItem>
          )))}
        </List>
      </Flex>
      <Text as='label' {...getLabelProps()} textAlign="left" className="py-2">
        ????????? ??????
      </Text>
      <Flex direction="column" flex="1 1 auto">
        <InputGroup size={{ base: "sm", md: "md" }}>
          <ComboboxInput
            placeholder="????????? ????????? ???????????????..."
            {...getInputProps(getDropdownProps({preventKeyAction: isOpen, ref: inputRef}))}
          />
          <InputRightElement>
            <IconButton
              size={{ base: "sm", md: "md" }}
              aria-label="toggle menu"
              type="button"
              {...getToggleButtonProps()}
              icon={isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
            />
          </InputRightElement>
        </InputGroup>
        <ComboboxList isOpen={isOpen} {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <ComboboxItem
                itemIndex={index}
                highlightedIndex={highlightedIndex}
                key={index}
                fontWeight={item === selectedItem ? "bold" : undefined}
                {...getItemProps({ item, index })}
              >
                <span>{item.itemName}</span>
              </ComboboxItem>
            ))
          }
        </ComboboxList>
      </Flex>
    </Flex>
  )
}