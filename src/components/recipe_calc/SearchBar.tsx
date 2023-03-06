import { Button, IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react"

export const SearchBar = () => {
  return (
    <InputGroup size={{ base: "sm", md: "md" }}>
      <Input
        placeholder="아이템 검색"
      />
      <InputRightElement>
      </InputRightElement>
    </InputGroup>
  )
}