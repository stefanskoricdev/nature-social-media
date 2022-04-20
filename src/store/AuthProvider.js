import React, { useEffect, useState } from "react";
import Backdrop from "../components/UI/Backdrop/Backdrop";
import ErrorModal from "../components/UI/Modal/ErrorModal/ErrorModal";
import Modal from "../components/UI/Modal/Modal";
import Spinner from "../components/UI/Spinner/Spinner";
import { useHttp } from "../hooks/useHttp";
import { BLOCKED_USERS_URL } from "../util/constants";
const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const initialUser = localStorage.getItem("user");
  const [token, setToken] = useState(initialToken);
  const [currentUser, setCurrentUser] = useState(JSON.parse(initialUser));
  const [blockedUsers, setBlockedUsers] = useState([]);

  const {
    sendRequest: blockedUsersReq,
    isLoading,
    error,
    setError,
  } = useHttp();

  const isUserLoggedIn = !!token;

  const loginHandler = (data) => {
    const { accessToken, user } = data;
    const currentUserData = {
      username: user.username,
      type: user.type,
    };
    setCurrentUser(currentUserData);
    localStorage.setItem("user", JSON.stringify(currentUserData));
    setToken(accessToken);
    localStorage.setItem("token", accessToken);
  };

  const logoutHandler = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    setToken(null);
    localStorage.removeItem("token");
  };

  const updateBlockedUsers = (data) => {
    setBlockedUsers([...data]);
  };

  const closeBackdropHandler = () => {
    setError(null);
  };

  useEffect(() => {
    blockedUsersReq({ url: BLOCKED_USERS_URL }, updateBlockedUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authCtxValue = {
    loginHandler,
    logoutHandler,
    isLoggedIn: isUserLoggedIn,
    currentUser,
    blockedUsers,
    setBlockedUsers,
  };
  return (
    <AuthContext.Provider value={authCtxValue}>
      <>
        {isLoading && (
          <Backdrop>
            <Spinner />
          </Backdrop>
        )}
        {error && (
          <Backdrop handleClick={closeBackdropHandler}>
            <Modal>
              <ErrorModal message={error} />
            </Modal>
          </Backdrop>
        )}
        {children}
      </>
    </AuthContext.Provider>
  );
};

export default AuthContext;
