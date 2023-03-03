import { Stack } from "@chakra-ui/react"
import { useBackgroundColor } from "../../../../utils/color"
import { NAV_ITEMS } from "../NavItem"
import { MobileNavItem } from "./MobileNavItem"

export const MobileNavbar = () => {
  return (
    <Stack
      bg={useBackgroundColor()}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}