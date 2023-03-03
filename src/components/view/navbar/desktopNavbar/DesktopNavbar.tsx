import { Box, Link, Stack } from "@chakra-ui/layout";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/popover";
import React from "react";
import { useBackgroundColor, useTextColor, useTextColorBold } from "../../../../utils/color";
import { NAV_ITEMS } from "../NavItem";
import { DesktopSubNav } from "./DsktopSubNav";

export const DesktopNavbar: React.FC = () => {
  const textColor = useTextColor();
  const textColorBold = useTextColorBold();
  const backgroundColor = useBackgroundColor();

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={textColor}
                _hover={{
                  textDecoration: 'none',
                  color: textColorBold,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={backgroundColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

