import React, { useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const isUserLoggedIn = !!token;

  const loginHandler = (data) => {
    const { accessToken } = data;
    setToken(accessToken);
    localStorage.setItem("token", accessToken);
  };

  const authCtxValue = {
    loginHandler,
    isLoggedIn: isUserLoggedIn,
  };
  return (
    <AuthContext.Provider value={authCtxValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
