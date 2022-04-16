import styles from "./UsersList.module.scss";
import { mockData } from "../../services/mockData";
import User from "./User/User";

const UsersList = () => {
  const { users } = mockData;

  const usersListEl = users.map((user) => (
    <User key={user.username} user={user} />
  ));

  return <ul className={styles.UsersList}>{usersListEl}</ul>;
};

export default UsersList;
