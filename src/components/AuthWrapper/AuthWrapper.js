import styles from "./AuthWrapper.module.scss";
import coverVector from "../../assets/img/coverVector.svg";
import heroCover from "../../assets/img/hero.png";
import logo from "../../assets/img/logo.svg";

const AuthWrapper = ({ children }) => {
  return (
    <section className={styles.AuthWrapper}>
      <section className={styles.AuthWrapperCover}>
        <img className={styles.AuthLogo} src={logo} alt="logo" />
        <img
          className={styles.CoverVector}
          src={coverVector}
          alt="cover_vector"
        />
        <img className={styles.CoverHero} src={heroCover} alt="hero_cover" />
      </section>
      <section className={styles.AuthContent}>{children}</section>
    </section>
  );
};

export default AuthWrapper;
