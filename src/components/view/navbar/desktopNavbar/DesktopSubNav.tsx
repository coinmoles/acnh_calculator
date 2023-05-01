import { Icon } from "@chakra-ui/icon";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Link, Stack, Text } from "@chakra-ui/layout";
import { useBackgroundColorLink, useTextColorLink } from "../../../../utils/color";
import { NavItem } from "../NavItem";

export const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  const backgroundColorLink = useBackgroundColorLink()
  const textColorLink = useTextColorLink()
  
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: backgroundColorLink }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: textColorLink }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};
