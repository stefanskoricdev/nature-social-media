import React, { useState } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const appCtxValue = {
    posts,
    users,
  };
  return (
    <AppContext.Provider value={appCtxValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;
