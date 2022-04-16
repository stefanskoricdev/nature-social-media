import styles from "./Admin.module.scss";
import { IoFilterSharp } from "react-icons/io5";
import UsersList from "../../components/UsersList/UsersList";

const Admin = () => {
  return (
    <section className={styles.Admin}>
      <header className={styles.AdminHeader}>
        <h2 className={styles.GreetingMessage}>
          Good day, <span>Admin</span>
        </h2>
        <button className={styles.Filter}>
          <span>Filter</span>
          <IoFilterSharp fontSize="2rem" color="rgb(22, 22, 22)" />
        </button>
      </header>
      <main className={styles.AdminMain}>
        <UsersList />
      </main>
    </section>
  );
};

export default Admin;
