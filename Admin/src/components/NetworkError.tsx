import { Box, Button, HStack, Image, Stack, Text } from "@chakra-ui/react"
import errorImage from "../assets/error404.webp"
import { useState } from "react";

const NetworkError = ({ children }: {children: string}) => {
  const [show, setShow] = useState(false);

  return (
    <Stack mt={120} alignItems="center">
      <Image src={errorImage} width="100px"/>
      <HStack>
        <Text>Sorry, something went wrong</Text>
        <Button onClick={() => setShow(!show)} colorScheme="blue" size={"sm"}> 
          {show ? "Hide" : "Show"} details
        </Button>
      </HStack>
      {show && 
      <Box mt={2} p={3} border={"2px"} borderColor={"white"} borderRadius={"10px"} bg={"white"}>
        <Text color={"#1A202C"} fontWeight={"bold"}>{children}</Text>
      </Box>
      }
    </Stack>
  )
}

export default NetworkError