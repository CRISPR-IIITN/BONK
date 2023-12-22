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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "../../hooks/useSignup";

const noSpacesRegex = /^[^\s]*$/;
const Schema = z
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

type Interface = z.infer<typeof Schema>;

const SignupForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSignup = (data: any) => {
    setUsername(data.username);
    setPassword(data.password);
    reset();
  };

  const responseHandler = async () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  }

  const attempt = useSignup({ username: username, password: password }, responseHandler, [
    username,
    password
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Interface>({ resolver: zodResolver(Schema) });

  return (
    <Box as='form' onSubmit={handleSubmit(handleSignup)}>
      <FormControl id='username'>
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
      <FormControl id='password' mt={4}>
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
      <FormControl id='confirmPassword' mt={4}>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          {...register("confirmPassword")}
          type='password'
          border='1px'
          borderColor='gray.600'
          _hover={{ borderColor: "gray.600" }}
        />
        {errors.confirmPassword && (
          <Text ml='5px' color='red'>
            {errors.confirmPassword.message}
          </Text>
        )}
      </FormControl>
      <Button colorScheme='blue' mt={4} type='submit'>
        Signup
      </Button>
      <MessageModal isOpen={isModalOpen} isSuccess={attempt.success}>
        {attempt.message}
      </MessageModal>
    </Box>
  );
};

export default SignupForm;
