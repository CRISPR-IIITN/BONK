import { useEffect, useState } from "react";
import apiClient from "../services/apiClient"

interface User {
  username: string,
  password: string
}

interface Message {
  success: boolean,
  message: string
}

export const useSignup = (body: User, onServerResponse?: () => void, deps ?: any[]) => {
  const [message, setMessage] = useState<Message>({success: false, message: ""});
  
  useEffect(() => {
    if (body.username && body.password){
      apiClient.post("/users/", {...body})
      .then((_) => {
        setMessage({success: true, message: "Signed up successfully!"});
        if (onServerResponse) onServerResponse();
      })
      .catch((error) => {
        setMessage({success: false, message: error.response.data});
        if (onServerResponse) onServerResponse();
      });
    }
  }, deps ? [...deps] : []);

  return message;
}

