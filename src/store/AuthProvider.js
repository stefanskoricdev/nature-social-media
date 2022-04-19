import React, { useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const initialUser = localStorage.getItem("user");
  const [token, setToken] = useState(initialToken);
  const [currentUser, setCurrentUser] = useState(JSON.parse(initialUser));

  const isUserLoggedIn = !!token;

  const loginHandler = (data) => {
    const { accessToken, user } = data;
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(accessToken);
    localStorage.setItem("token", accessToken);
  };

  const logoutHandler = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    setToken(null);
    localStorage.removeItem("token");
  };

  const authCtxValue = {
    loginHandler,
    logoutHandler,
    isLoggedIn: isUserLoggedIn,
    currentUser,
  };
  return (
    <AuthContext.Provider value={authCtxValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
