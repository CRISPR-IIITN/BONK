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
  Text
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const noSpacesRegex = /^[^\s]*$/;
const loginSchema = z.object({
  username: z
    .string()
    .min(8, { message: "Invalid username" })
    .regex(noSpacesRegex, { message: "Invalid username" }),
  password: z
    .string()
    .min(8, { message: "Invalid password" })
    .regex(noSpacesRegex, { message: "Invalid password" }),
});

const signupSchema = z
  .object({
    username: z
      .string()
      .min(8, { message: "Username must be at least 8 characters" })
      .regex(noSpacesRegex, { message: "Username cannot contain spaces" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(noSpacesRegex, { message: "Password cannot contain spaces" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(noSpacesRegex, { message: "Password cannot contain spaces" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type loginInterface = z.infer<typeof loginSchema>;
type signupInterface = z.infer<typeof signupSchema>;

const Login = () => {
  const {
    register: loginRegister,
    handleSubmit: loginHandler,
    formState: { errors: loginErrors },
    reset: loginReset,
  } = useForm<loginInterface>({ resolver: zodResolver(loginSchema) });

  const {
    register: signupRegister,
    handleSubmit: signupHandler,
    formState: { errors: signupErrors },
    reset: signupReset,
  } = useForm<signupInterface>({ resolver: zodResolver(signupSchema) });

  const handleLogin = (data: any) => {
    console.log(data);
    loginReset();
  };

  const handleSignup = (data: any) => {
    console.log(data);
    signupReset();
  };
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
            <Box as='form' onSubmit={loginHandler(handleLogin)}>
              <FormControl id='usernameLogin'>
                <FormLabel>Username</FormLabel>
                <Input
                  {...loginRegister("username")}
                  type='text'
                  border='1px'
                  borderColor='gray.600'
                  _hover={{ borderColor: "gray.600" }}
                />
                {loginErrors.username && (
                  <Text ml='5px' color='red'>
                    {loginErrors.username.message}
                  </Text>
                )}
              </FormControl>
              <FormControl id='passwordLogin' mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  {...loginRegister("password")}
                  type='password'
                  border='1px'
                  borderColor='gray.600'
                  _hover={{ borderColor: "gray.600" }}
                />
                {loginErrors.password && (
                  <Text ml='5px' color='red'>
                    {loginErrors.password.message}
                  </Text>
                )}
              </FormControl>
              <Button colorScheme='blue' mt={4} type='submit'>
                Login
              </Button>
            </Box>
          </TabPanel>
          <TabPanel
            border='1px'
            borderBottomRadius='7px'
            borderColor='gray.600'
            color='black'
          >
            <Box as='form' onSubmit={signupHandler(handleSignup)}>
              <FormControl id='username'>
                <FormLabel>Username</FormLabel>
                <Input
                  {...signupRegister("username")}
                  type='text'
                  border='1px'
                  borderColor='gray.600'
                  _hover={{ borderColor: "gray.600" }}
                />
                {signupErrors.username && (
                  <Text ml='5px' color='red'>
                    {signupErrors.username.message}
                  </Text>
                )}
              </FormControl>
              <FormControl id='password' mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  {...signupRegister("password")}
                  type='password'
                  border='1px'
                  borderColor='gray.600'
                  _hover={{ borderColor: "gray.600" }}
                />
                {signupErrors.password && (
                  <Text ml='5px' color='red'>
                    {signupErrors.password.message}
                  </Text>
                )}
              </FormControl>
              <FormControl id='confirmPassword' mt={4}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  {...signupRegister("confirmPassword")}
                  type='password'
                  border='1px'
                  borderColor='gray.600'
                  _hover={{ borderColor: "gray.600" }}
                />
                {signupErrors.confirmPassword && (
                  <Text ml='5px' color='red'>
                    {signupErrors.confirmPassword.message}
                  </Text>
                )}
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
