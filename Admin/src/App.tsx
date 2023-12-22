import { useState, useEffect } from "react";
import Heatmap from "./pages/Heatmap";
import Login from "./pages/Login";
import Cookies from "js-cookie";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if(Cookies.get("user_cookie"))
      setIsLoggedIn(true);
    setIsLoading(false);
  }, [isLoggedIn]);

  if(isLoading)
    return <></>;

  return (
    <>
      {isLoggedIn ? (
        <Heatmap onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)}/>
      )}
    </>
  );
}

export default App;
