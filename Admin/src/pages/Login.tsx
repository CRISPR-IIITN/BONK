import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

const Login = () => {
  return (
    <Box
      p={4}
      maxW='400px'
      mx='auto'
      my='140px'
      borderWidth={1}
      borderRadius='lg'
      bg='white'
    >
      <Tabs isFitted variant='enclosed'>
        <TabList>
          <Tab
            color={"black"}
            border='1px'
            borderColor='gray.600'
            _selected={{ color: "white", bg: "gray.600" }}
            mr='3px'
          >
            Login
          </Tab>
          <Tab
            color={"black"}
            border='1px'
            borderColor='gray.600'
            _selected={{ color: "white", bg: "gray.600" }}
          >
            Signup
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel border='1px' borderBottomRadius="7px" borderColor='gray.600' color='black'>
            <Box as="form">
              <FormControl id='username'>
                <FormLabel>Username</FormLabel>
                <Input
                  type='text'
                  border='1px'
                  borderColor='gray.600'
                  _hover={{ borderColor: "gray.600" }}
                />
              </FormControl>
              <FormControl id='password' mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  border='1px'
                  borderColor='gray.600'
                  _hover={{ borderColor: "gray.600" }}
                />
              </FormControl>
              <Button colorScheme='blue' mt={4} type='submit'>
                Login
              </Button>
            </Box>
          </TabPanel>
          <TabPanel border='1px' borderBottomRadius="7px" borderColor='gray.600' color='black'>
            <Box as="form">
              <FormControl id='username'>
                <FormLabel>Username</FormLabel>
                <Input
                  type='text'
                  border='1px'
                  borderColor='gray.600'
                  _hover={{ borderColor: "gray.600" }}
                />
              </FormControl>
              <FormControl id='password' mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  border='1px'
                  borderColor='gray.600'
                  _hover={{ borderColor: "gray.600" }}
                />
              </FormControl>
              <FormControl id='confirmPassword' mt={4}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type='password'
                  border='1px'
                  borderColor='gray.600'
                  _hover={{ borderColor: "gray.600" }}
                />
              </FormControl>
              <Button colorScheme='blue' mt={4} type='submit'>
                Signup
              </Button>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Login;
