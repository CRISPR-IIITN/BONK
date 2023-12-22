import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import MessageModal from "./MessageModal";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "../../hooks/useLogin";

const noSpacesRegex = /^[^\s]*$/;
const Schema = z.object({
  username: z
    .string()
    .min(8, { message: "Invalid username" })
    .regex(noSpacesRegex, { message: "Invalid username" }),
  password: z
    .string()
    .min(8, { message: "Invalid password" })
    .regex(noSpacesRegex, { message: "Invalid password" }),
});

type Interface = z.infer<typeof Schema>;

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Interface>({ resolver: zodResolver(Schema) });

  const handleLogin = (data: any) => {
    setUsername(data.username);
    setPassword(data.password);
  };

  const responseHandler = async () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };

  const attempt = useLogin({ username, password }, responseHandler, [
    username,
    password,
  ]);

  return (
    <Box as='form' onSubmit={handleSubmit(handleLogin)}>
      <FormControl id='usernameLogin'>
        <FormLabel>Username</FormLabel>
        <Input
          {...register("username")}
          type='text'
          border='1px'
          borderColor='gray.600'
          _hover={{ borderColor: "gray.600" }}
        />
        {errors.username && (
          <Text ml='5px' color='red'>
            {errors.username.message}
          </Text>
        )}
      </FormControl>
      <FormControl id='passwordLogin' mt={4}>
        <FormLabel>Password</FormLabel>
        <Input
          {...register("password")}
          type='password'
          border='1px'
          borderColor='gray.600'
          _hover={{ borderColor: "gray.600" }}
        />
        {errors.password && (
          <Text ml='5px' color='red'>
            {errors.password.message}
          </Text>
        )}
      </FormControl>
      <Button colorScheme='blue' mt={4} type='submit'>
        Login
      </Button>
      <MessageModal isOpen={isModalOpen} isSuccess={attempt.success}>
        {attempt.message}
      </MessageModal>
    </Box>
  );
};

export default LoginForm;
