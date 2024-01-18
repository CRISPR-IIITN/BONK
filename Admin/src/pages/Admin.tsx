import {
  Grid,
  GridItem,
  HStack,
  List,
  ListItem,
  Switch,
  Text,
  Badge,
  IconButton,
  Box,
  Flex,
} from "@chakra-ui/react";
import NavBar from "../components/heatmap/NavBar";
import { User } from "../App";
import useUsers from "../hooks/useUsers";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Props {
  onLogout: () => void;
  user: User;
  page: number;
  setPage: (page: number) => void;
}

const ITEMS_PER_PAGE = 10;

const Admin = ({ onLogout, user, page, setPage }: Props) => {
  const { data: users, error, isLoading } = useUsers();
  const [currentPage, setCurrentPage] = useState(0);

  const handleToggleAdmin = (user: User) => {
    // put method with isAdmin set to !user.isAdmin
    users[users.indexOf(user)].isAdmin = !user.isAdmin;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const displayedUsers = users.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <>
      <Grid templateAreas={`"nav" "main"`}>
        <GridItem area='nav' bgColor='#0d111a'>
          <NavBar
            isAdmin={user.isAdmin}
            page={page}
            setPage={setPage}
            onLogout={onLogout}
          />
        </GridItem>
        <GridItem area='main' mt={3}>
          <Flex direction='column' alignItems='center'>
            <Box
              width='80%'
              borderWidth='1px'
              borderRadius='lg'
              borderColor='white'
              overflow='hidden'
              mx='auto'
              mt={5}
            >
              <List spacing={3}>
                {displayedUsers.map((user) => (
                  <ListItem key={user.username} borderBottom='1px' p={2}>
                    <HStack justifyContent='space-between'>
                      <Text>{user.username}</Text>
                      <HStack>
                        {user.isAdmin && (
                          <Badge colorScheme='green'>Admin</Badge>
                        )}
                        <Switch
                          colorScheme='green'
                          isChecked={user.isAdmin}
                          onChange={() => handleToggleAdmin(user)}
                        />
                      </HStack>
                    </HStack>
                  </ListItem>
                ))}
              </List>
            </Box>
            <HStack spacing={4} mt='2%'>
              <IconButton
                aria-label='Previous page'
                icon={<FiChevronLeft />}
                onClick={() => setCurrentPage(currentPage - 1)}
                variant={currentPage === 0 ? "" : "solid"}
              />
              <IconButton
                aria-label='Next page'
                icon={<FiChevronRight />}
                onClick={() => setCurrentPage(currentPage + 1)}
                variant={
                  currentPage === Math.ceil(users.length / ITEMS_PER_PAGE) - 1
                    ? ""
                    : "solid"
                }
              />
            </HStack>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};

export default Admin;
