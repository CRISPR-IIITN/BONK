import { HStack, IconButton, Image, Tooltip } from "@chakra-ui/react";
import logo from "../../assets/crispr_logo.png";
import { FiLogOut, FiUser, FiSettings } from "react-icons/fi";
import Cookie from "js-cookie";

interface Props {
  onLogout: () => void;
  isAdmin: boolean;
}

const NavBar = ({ onLogout, isAdmin }: Props) => {
  const handleLogout = () => {
    Cookie.remove("user_cookie");
    onLogout();
  };

  return (
    <HStack justifyContent='space-between'>
      <Image src={logo} boxSize='70px' pl={5} />
      <HStack mr={5}>
        {!isAdmin && (
          <Tooltip label='Admin' bg='black' color='white'>
            <IconButton
              aria-label='Admin'
              icon={<FiUser size='24px' />}
              variant='ghost'
              mr={1}
              _hover={{ background: "gray.600", color: "white" }}
            />
          </Tooltip>
        )}
        <Tooltip label='Settings' bg='black' color='white'>
          <IconButton
            aria-label='Settings'
            icon={<FiSettings size='24px' />}
            variant='ghost'
            mr={1}
            _hover={{ background: "gray.600", color: "white" }}
          />
        </Tooltip>
        <Tooltip label='Logout' bg='black' color='white'>
          <IconButton
            aria-label='Logout'
            icon={<FiLogOut size='24px' />}
            onClick={handleLogout}
            variant='ghost'
            mr={1}
            _hover={{ background: "gray.600", color: "white" }}
          />
        </Tooltip>
      </HStack>
    </HStack>
  );
};

export default NavBar;
