import styles from "./UsersList.module.scss";
import User from "./User/User";

const UsersList = ({ users }) => {
  if (users.length < 1) return;

  const usersListEl = users.map((user) => (
    <User key={user.username} user={user} />
  ));

  return <ul className={styles.UsersList}>{usersListEl}</ul>;
};

export default UsersList;
