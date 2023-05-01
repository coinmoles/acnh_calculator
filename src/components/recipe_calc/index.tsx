import { Box, Divider, Heading } from "@chakra-ui/react"
import { useMultipleSelection } from "downshift"
import { useState } from "react"
import { ItemWithQuantity } from "../../utils/types/Item"
import { withView } from "../view"
import { SearchBar } from "./SearchBar"
import { SelectedItemTable } from "./SelectedItemsTable"

const RecipeCalc = () => {
  const [selectedItems, setSelectedItems] = useState<ItemWithQuantity[]>([])

  const {
    getDropdownProps,
    removeSelectedItem
  } = useMultipleSelection({
    selectedItems,
    onStateChange({ selectedItems: newSelectedItems, type }) {
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

  return (
    <Box overflow={"hidden"}>
      <Heading paddingY={5} textAlign="left" as="h1">
        목적 아이템
      </Heading>
      <SearchBar
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        getDropDownProps={getDropdownProps}
      />
      <Divider padding={3}/>
      <SelectedItemTable
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        removeSelectedItem={removeSelectedItem}
      />
    </Box>
  )
}

export const RecipeCalcPage = withView(RecipeCalc)