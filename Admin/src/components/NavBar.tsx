import { HStack, Image, Text } from "@chakra-ui/react"
import logo from "../assets/crispr_logo.png"


const NavBar = () => {
  return (
    <HStack justifyContent="space-between">
      <Image src={logo} boxSize="70px" pl="2"/>
      <Text fontSize="xl" fontWeight="bold" color="#fff" pr="5">B.O.N.K</Text>
    </HStack>
  )
}

export default NavBar