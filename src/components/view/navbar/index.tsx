import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box, Collapse,
  Flex,
  IconButton, Text,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import { useBackgroundColor, useBorderColor, useTextColor, useTextColorBold } from '../../../utils/color';
import { DesktopNavbar } from './desktopNavbar/DesktopNavbar';
import { MobileNavbar } from './mobileNavbar/MobileNavbar';

export const Navbar: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useBackgroundColor()}
        color={useTextColor()}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useBorderColor()}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useTextColorBold()}>
            ACNH Calculator
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNavbar />
          </Flex>
        </Flex>

        <Flex
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
        />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNavbar />
      </Collapse>
    </Box>
  );

}