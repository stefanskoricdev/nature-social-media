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
import Popover from "../../components/Popover/Popover";

const Admin = () => {
  const [filter, setFilter] = useState("all");
  const [showFilter, setShowFilter] = useState(false);

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

  useEffect(() => {
    console.log(users);
  }, [users]);

  if (!users) return;

  const filterView = (filter) => {
    let allUsersList = [...users];
    let sortedUsersList = null;
    if (filter === "status") {
      sortedUsersList = allUsersList.sort((a, b) => a.isActive - b.isActive);
    } else if (filter === "type") {
      sortedUsersList = allUsersList.sort((a, b) =>
        a.type.localeCompare(b.type)
      );
    } else {
      sortedUsersList = allUsersList.sort((a, b) => b.createdAt - a.createdAt);
    }
    return sortedUsersList;
  };

  const sortedUsers = filterView(filter);

  if (error) {
    return (
      <Backdrop handleClick={handleCloseBackdrop}>
        <Modal>
          <ErrorModal message={error} />
        </Modal>
      </Backdrop>
    );
  }

  const handleShowFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  const changeFilterValueHandler = (e) => {
    const { id } = e.target;
    if (!id) return;
    setFilter(id);
  };

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
        <button onClick={handleShowFilter} className={styles.FilterBtn}>
          <span>Filter</span>
          <IoFilterSharp fontSize="2rem" color="rgb(22, 22, 22)" />
          <Popover handleClick={changeFilterValueHandler} show={showFilter}>
            <li id="all">All</li>
            <li id="status">Status</li>
            <li id="type">Type</li>
          </Popover>
        </button>
      </header>
      <main className={styles.AdminMain}>
        <UsersList users={sortedUsers} setUsers={setUsers} />
      </main>
    </section>
  );
};

export default Admin;
