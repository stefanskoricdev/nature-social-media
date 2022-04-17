import styles from "./Header.module.scss";
import { BsPlus } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../store/AuthProvider";
import logo from "../../assets/img/logo.svg";

const Header = () => {
  const location = useLocation();

  const [isAddPostPage, setIsAddPostPage] = useState(false);

  const authCtx = useContext(AuthContext);

  const { logoutHandler } = authCtx;

  useEffect(() => {
    if (location.pathname === "/add-new-post") {
      setIsAddPostPage(true);
      return;
    }
    setIsAddPostPage(false);
  }, [location]);

  return (
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
          <button onClick={logoutHandler} className={styles.LogOutBtn}>
            <MdLogout fontSize="1.4rem" />
            <span>Log Out</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
