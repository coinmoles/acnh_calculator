import { useColorModeValue } from "@chakra-ui/react"

export const useBackgroundColorNavBar = () => {
    return useColorModeValue('gray.100', 'white')
}

export const useBackgroundColor = () => {
    return useColorModeValue('white', 'gray.800')
}

export const useBackgroundColorLink = () => {
    return useColorModeValue('pink.50', 'gray.900')
}

export const useTextColorBold = () => {
    return useColorModeValue('gray.800', 'white')
}

export const useTextColor = () => {
    return useColorModeValue('gray.600', 'white')
}

export const useTextColorLink = () => {
    return useColorModeValue('pink.400', 'gray.900')
}

export const useBorderColor = () => {
    return useColorModeValue('gray.200', 'gray.900')
}

