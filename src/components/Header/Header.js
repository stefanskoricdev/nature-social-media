import styles from "./Header.module.scss";
import { BsPlus } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import logo from "../../assets/img/logo.svg";

const Header = () => {
  return (
    <header className={styles.Header}>
      <nav>
        <img className={styles.Logo} src={logo} alt="logo" />
        <div className={styles.NavBtnGroup}>
          <button className={styles.AddPostBtn}>
            <BsPlus fontSize="2.6rem" /> <span>Add New</span>
          </button>
          <button className={styles.LogOutBtn}>
            <MdLogout fontSize="1.4rem" />
            <span>Log Out</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
