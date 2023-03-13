import { useState } from "react"
import { ItemWithQuantity } from "../../utils/types/Item"
import { withView } from "../view"
import { SearchBar } from "./SearchBar"

const RecipeCalc = () => {
  const [selectedItems, setSelectedItems] = useState<ItemWithQuantity[]>([])
  
  return (
    <div>
      <SearchBar
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  )
}

export const RecipeCalcPage = withView(RecipeCalc)