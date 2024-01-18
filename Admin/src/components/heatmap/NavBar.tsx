import { HStack, IconButton, Image, Tooltip } from "@chakra-ui/react";
import logo from "../../assets/crispr_logo.png";
import { FiLogOut, FiUser, FiSettings, FiBarChart2 } from "react-icons/fi";
import Cookie from "js-cookie";

interface Props {
  onLogout: () => void;
  isAdmin: boolean;
  page: number;
  setPage: (page: number) => void;
}

const NavBar = ({ onLogout, isAdmin, page, setPage }: Props) => {
  const handleLogout = () => {
    Cookie.remove("user_cookie");
    onLogout();
  };

  const notCurrentPage = (t: number) => {
    return t !== page;
  };

  return (
    <HStack justifyContent='space-between'>
      <Image src={logo} boxSize='70px' pl={5} />
      <HStack mr={5}>
        {notCurrentPage(1) && (
          <Tooltip label='Heatmap' bg='black' color='white'>
            <IconButton
              aria-label='Heatmap'
              icon={<FiBarChart2 size='24px' />}
              onClick={() => setPage(1)}
              variant='ghost'
              mr={1}
              _hover={{ background: "gray.600", color: "white" }}
            />
          </Tooltip>
        )}
        {(notCurrentPage(2) && isAdmin) && (
          <Tooltip label='Admin' bg='black' color='white'>
            <IconButton
              aria-label='Admin'
              icon={<FiUser size='24px' />}
              onClick={() => setPage(2)}
              variant='ghost'
              mr={1}
              _hover={{ background: "gray.600", color: "white" }}
            />
          </Tooltip>
        )}
        {notCurrentPage(3) && (
          <Tooltip label='Settings' bg='black' color='white'>
            <IconButton
              aria-label='Settings'
              icon={<FiSettings size='24px' />}
              onClick={() => setPage(3)}
              variant='ghost'
              mr={1}
              _hover={{ background: "gray.600", color: "white" }}
            />
          </Tooltip>
        )}
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
