import { Box } from "@chakra-ui/react"
import { SearchBar } from "../recipe_calc/SearchBar"
import { Navbar } from "./navbar"

export const withView = (InnerComponent: React.FC) => {
  return () => {
    return (
      <div>
        <Navbar />
        <Box p='6'>
          <InnerComponent />
        </Box>
      </div >
    )
  }
}