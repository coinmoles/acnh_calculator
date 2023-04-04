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
    <div>
      <SearchBar
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        getDropDownProps={getDropdownProps}
      />
      <SelectedItemTable
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        removeSelectedItem={removeSelectedItem}
      />
    </div>
  )
}

export const RecipeCalcPage = withView(RecipeCalc)