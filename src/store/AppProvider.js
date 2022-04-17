import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/useHttp";
import { POSTS_URL } from "../util/constants";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const { sendRequest: postsRequest, isLoading, error, setError } = useHttp();

  const updatePosts = (data) => {
    setPosts([...data]);
  };

  useEffect(() => {
    postsRequest({ url: POSTS_URL }, updatePosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
