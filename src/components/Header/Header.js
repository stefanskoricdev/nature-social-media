import styles from "./Header.module.scss";
import { BsPlus } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../store/AuthProvider";
import logo from "../../assets/img/logo.svg";
import Backdrop from "../UI/Backdrop/Backdrop";
import Modal from "../UI/Modal/Modal";
import WarningModal from "../UI/Modal/WarningModal/WarningModal";

const Header = () => {
  const [showWarningModal, setShowWarningModal] = useState(false);

  const [isAddPostPage, setIsAddPostPage] = useState(false);

  const authCtx = useContext(AuthContext);
  const { logoutHandler, currentUser } = authCtx;

  const location = useLocation();

  const toggleWarningModalHandler = (e) => {
    setShowWarningModal((prevState) => !prevState);
  };

  useEffect(() => {
    if (location.pathname === "/add-new-post") {
      setIsAddPostPage(true);
      return;
    }
    setIsAddPostPage(false);
  }, [location]);

  return (
    <>
      {showWarningModal && (
        <Backdrop handleClick={toggleWarningModalHandler}>
          <Modal>
            <WarningModal
              message="Are you sure you want log out?"
              onConfirm={logoutHandler}
              onDiscard={toggleWarningModalHandler}
              isLoading={false}
              isError={false}
            />
          </Modal>
        </Backdrop>
      )}
      <header className={styles.Header}>
        <nav>
          <Link to="/home">
            <img className={styles.Logo} src={logo} alt="logo" />
          </Link>
          <div className={styles.NavBtnGroup}>
            {!isAddPostPage && (
              <Link to="/add-new-post" className={styles.AddPostBtn}>
                <BsPlus fontSize="2.6rem" /> <span>Add New</span>
              </Link>
            )}
            {currentUser.type === "admin" && (
              <Link to="/admin" className={styles.AddPostBtn}>
                <span>Dashboard</span>
              </Link>
            )}
            <button
              onClick={toggleWarningModalHandler}
              className={styles.LogOutBtn}
            >
              <MdLogout fontSize="1.4rem" />
              <span>Log Out</span>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
