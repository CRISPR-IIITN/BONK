import { useState, useEffect } from "react";
import Heatmap from "./pages/Heatmap";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import { set } from "zod";

export interface User {
  _id: string;
  username: string;
  password: string;
  isAdmin: boolean;
  isSuperuser: boolean;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>({username: "", password: "", _id: "", isAdmin: false, isSuperuser: false});

  useEffect(() => {
    const userCookieString = Cookies.get("user_cookie");
    if(userCookieString) {
      const userCookie = JSON.parse(userCookieString);
      setUser(userCookie);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, [isLoggedIn]);

  if(isLoading)
    return <></>;

  return (
    <>
      {isLoggedIn ? (
        <Heatmap user={user} onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)}/>
      )}
    </>
  );
}

export default App;
