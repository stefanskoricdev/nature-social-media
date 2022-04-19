import styles from "./UsersList.module.scss";
import User from "./User/User";

const UsersList = ({ users, setUsers }) => {
  const usersListEl = users.map((user) => (
    <User key={user.username} user={user} users={users} setUsers={setUsers} />
  ));

  return <ul className={styles.UsersList}>{usersListEl}</ul>;
};

export default UsersList;
