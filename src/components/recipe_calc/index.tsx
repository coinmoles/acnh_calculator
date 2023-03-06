import { withView } from "../view"
import { SearchBar } from "./SearchBar"

const RecipeCalc = () => {
  return (
    <div>
      <SearchBar />
    </div>
  )
}

export const RecipeCalcPage = withView(RecipeCalc)