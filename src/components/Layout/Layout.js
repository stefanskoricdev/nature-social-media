import styles from "./Layout.module.scss";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <section className={styles.Layout}>
      <Header />
      <main className={styles.LayoutMain}>
        <Outlet />
      </main>
    </section>
  );
};

export default Layout;
