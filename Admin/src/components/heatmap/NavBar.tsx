import { HStack, IconButton, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/crispr_logo.png";
import { FiLogOut } from "react-icons/fi";
import Cookie from "js-cookie";

const NavBar = ({ onLogout }: { onLogout: () => void }) => {
  const handleLogout = () => {
    Cookie.remove("user_cookie");
    onLogout();
  };

  return (
    <HStack justifyContent='space-between'>
      <Image src={logo} boxSize='70px' pl='2' />
      <HStack>
        <IconButton
          aria-label="Logout"
          icon={<FiLogOut size="24px" />}
          onClick={handleLogout}
          mr={5}
          variant="ghost"
          _hover={{ background: "gray.600", color: "white" }}
        />
        <Text fontSize='xl' fontWeight='bold' color='#fff' pr='5'>
          B.O.N.K
        </Text>
      </HStack>
    </HStack>
  );
};

export default NavBar;
