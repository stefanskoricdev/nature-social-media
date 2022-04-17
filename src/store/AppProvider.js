import React, { useEffect, useState, useContext } from "react";
import { useHttp } from "../hooks/useHttp";
import { POSTS_URL } from "../util/constants";
import AuthContext from "./AuthProvider";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const { sendRequest: postsRequest, isLoading, error, setError } = useHttp();

  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  const updatePosts = (data) => {
    setPosts([...data]);
  };

  useEffect(() => {
    if (isLoggedIn) {
      postsRequest({ url: POSTS_URL }, updatePosts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const appCtxValue = {
    posts,
    setPosts,
    isLoading,
    error,
    setError,
  };
  return (
    <AppContext.Provider value={appCtxValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;
