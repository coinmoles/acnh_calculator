import { Box } from "@chakra-ui/react"
import { Navbar } from "./navbar"
import { useBackgroundColor } from "../../utils/color"

export const withView = (InnerComponent: React.FC) => {
  return () => {
    return (
      <div>
        <Navbar />
        <Box p='6' bg={useBackgroundColor()}>
          <InnerComponent />
        </Box>
      </div >
    )
  }
}