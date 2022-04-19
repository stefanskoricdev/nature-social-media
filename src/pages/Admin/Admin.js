import styles from "./Admin.module.scss";
import { IoFilterSharp } from "react-icons/io5";
import { useHttp } from "../../hooks/useHttp";
import { useState, useEffect } from "react";
import { USERS_URL } from "../../util/constants";
import UsersList from "../../components/UsersList/UsersList";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import ErrorModal from "../../components/UI/Modal/ErrorModal/ErrorModal";

const Admin = () => {
  const [users, setUsers] = useState();
  const { sendRequest: usersRequest, isLoading, error, setError } = useHttp();

  const updateUsers = (data) => {
    setUsers([...data]);
  };

  useEffect(() => {
    usersRequest({ url: USERS_URL }, updateUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseBackdrop = () => {
    setError(null);
  };

  if (!users) return;

  if (error) {
    return (
      <Backdrop handleClick={handleCloseBackdrop}>
        <Modal>
          <ErrorModal message={error} />
        </Modal>
      </Backdrop>
    );
  }

  return (
    <section className={styles.Admin}>
      {isLoading && (
        <Backdrop>
          <Spinner color="#00b960" />
        </Backdrop>
      )}
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
        <UsersList users={users} setUsers={setUsers} />
      </main>
    </section>
  );
};

export default Admin;
