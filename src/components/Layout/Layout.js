import styles from "./Layout.module.scss";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <section className={styles.Layout}>
      <Header />
      <main>{children}</main>
    </section>
  );
};

export default Layout;
