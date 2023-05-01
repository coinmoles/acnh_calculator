import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons"
import { Flex, IconButton, Input, InputGroup, InputRightElement, List, ListItem, Popover, PopoverContent, PopoverTrigger, Text } from "@chakra-ui/react"
import { GetPropsCommonOptions, UseMultipleSelectionGetDropdownProps, useCombobox } from "downshift"
import React, { forwardRef, useMemo, useRef, useState } from "react"
import { useBackgroundColor, useBackgroundColorLink, useTextColor, useTextColorLink } from "../../utils/color"
import { getFilteredItemList } from "../../utils/data/itemList"
import { Item, ItemWithQuantity } from "../../utils/types/Item"

const ComboboxInput = forwardRef<HTMLInputElement>((props, ref) => {
  return <Input {...props} ref={ref} />
})

const ComboboxList = forwardRef<HTMLUListElement, { isOpen: boolean, }>(({ isOpen, ...props }, ref) => {
  return <List display={isOpen ? undefined : "none"} {...props} ref={ref} />
})

const ComboboxItem = forwardRef<HTMLLIElement, { itemIndex: number, highlightedIndex: number }>(
  ({ itemIndex, highlightedIndex, ...props }, ref) => {
    const backgroundColorLink = useBackgroundColorLink()
    const textColorLink = useTextColorLink()
    const backgroundColor = useBackgroundColor()
    const textColor = useTextColor()

    return (
      <ListItem
        px={3}
        py={2}
        cursor="pointer"
        bg={itemIndex === highlightedIndex ? backgroundColorLink : backgroundColor}
        fontSize={{md: 'md', base: 'sm'}}
        textColor={itemIndex === highlightedIndex ? textColorLink : textColor}
        {...props}
        ref={ref}
      />
    )
  }
)

export const SearchBar = (props: {
  selectedItems: ItemWithQuantity[],
  setSelectedItems: React.Dispatch<React.SetStateAction<ItemWithQuantity[]>>,
  getDropDownProps: (options?: UseMultipleSelectionGetDropdownProps | undefined, extraOptions?: GetPropsCommonOptions | undefined) => any
}) => {
  const { selectedItems, setSelectedItems, getDropDownProps } = props
  const [inputValue, ] = useState("");
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
      const { changes, type } = actionAndChanges
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
      <Text as='label' {...getLabelProps()} textAlign="left" className="py-2">
        아이템 검색
      </Text>
      <Popover isOpen={isOpen} placement={'bottom-start'}>
        <PopoverTrigger>
          <InputGroup size={{ base: "sm", md: "md" }}>
            <ComboboxInput
              placeholder="아이템 이름을 입력하세요..."
              {...getInputProps(getDropDownProps({ preventKeyAction: isOpen, ref: inputRef }))}
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
        </PopoverTrigger>
        <PopoverContent
          border={0}
          boxShadow={'xl'}
          p={4}
          rounded={'xl'}
          minW={'full'}
        >
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
        </PopoverContent>
      </Popover>
    </Flex>
  )
}