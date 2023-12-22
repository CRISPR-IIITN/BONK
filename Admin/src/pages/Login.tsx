import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import LoginForm from "../components/login/LoginForm";
import SignupForm from "../components/login/SignupForm";

const Login = ({ onLogin }: { onLogin: () => void }) => {
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
          <TabPanel
            border='1px'
            borderBottomRadius='7px'
            borderColor='gray.600'
            color='black'
          >
            <LoginForm onLogin={onLogin}/>
          </TabPanel>
          <TabPanel
            border='1px'
            borderBottomRadius='7px'
            borderColor='gray.600'
            color='black'
          >
            <SignupForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Login;
