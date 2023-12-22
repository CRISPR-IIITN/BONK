import { useEffect, useState } from "react";
import apiClient from "../services/apiClient"
import Cookies from "js-cookie";

interface User {
  username: string,
  password: string
}

interface Message {
  success: boolean,
  message: string
}

const useLogin = (body: User, onLogin:() => void, onServerResponse ?: () => void, deps ?: any[]) => {
  const [message, setMessage] = useState<Message>({success: false, message: ""});

  useEffect(() => {

    if (body.username && body.password){
      apiClient.post("/users/login", {...body})
      .then((user) => {
        Cookies.set("user_cookie", JSON.stringify(user), { expires: 2 });
        setMessage({success: true, message: "Logged in successfully!"});
        onLogin();
      })
      .catch((error) => {
        setMessage({success: false, message: error.response.data});
        if (onServerResponse) onServerResponse();
      });
    } 
  }, deps ? [...deps] : []);

  return message;
}

export default useLogin;