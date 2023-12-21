import { useEffect, useState } from "react";
import apiClient from "../services/apiClient"
import Cookies from "js-cookie";

interface User {
  username: string,
  password: string
}

export const useSignup = (body: User, deps ?: any[]) => {
  const [message, setMessage] = useState<string>();
  
  useEffect(() => {
    if (body.username && body.password){
      apiClient.post("/users/", {...body})
      .then((_) => {
        setMessage("Signed up successfully!");
      })
      .catch((error: string) => {
        setMessage(error);
      });
    }
  }, deps ? [...deps] : []);

  return {message};
}

export const useLogin = (body: User, deps ?: any[]) => {
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (body.username && body.password){
      apiClient.post("/users/login", {...body})
      .then((user) => {
        Cookies.set("user_cookie", JSON.stringify(user), { expires: 2 });
        setMessage("Logged in successfully!");
      })
      .catch((error: string) => {
        setMessage(error);
      });
    } 
  }, deps ? [...deps] : []);

  return {message};
}