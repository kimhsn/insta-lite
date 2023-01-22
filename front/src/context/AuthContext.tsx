import { createContext, useCallback, useState } from "react";
import { User } from "../pages/utils";
import * as React from "react";

type Props = {
  children?: React.ReactNode;
};

type LoginContextType = {
  user: User | null;
  isLoggedIn: boolean;
  darkMode: boolean;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setDarkMode: (darkMode: boolean) => void;
};

export const LoginContext = createContext<LoginContextType>({
  user: null,
  isLoggedIn: false,
  darkMode: false,
  setUser: () => {},
  setIsLoggedIn: () => {},
  setDarkMode: () => {},

});

function LoginCtxProvider(props: Props) {
  const [user, setUser] = useState<User | null>(
    localStorage.getItem("jwt") && localStorage.getItem("user")
      ? {
          ...JSON.parse(localStorage.getItem("user") as string),
          jwt: localStorage.getItem("jwt"),
        }
      : null
  );
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("jwt") && localStorage.getItem("user") ? true : false
  );
  const userHandler = (user: User | null) => {
    setUser(user);
  };
  const isLoggedInHandler = (loginStatus: boolean) => {
    setIsLoggedIn(loginStatus);
  };

  const darkModeHandler = (darkMode: boolean) => {
    setDarkMode(darkMode);
  };

  return (
    <LoginContext.Provider
      value={{
        user,
        isLoggedIn,
        darkMode,
        setUser: userHandler,
        setIsLoggedIn: isLoggedInHandler,
        setDarkMode: darkModeHandler,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginCtxProvider;