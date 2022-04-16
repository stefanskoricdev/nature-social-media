import styles from "./User.module.scss";
import avatar from "../../../assets/img/avatarSmallSize.png";
import { MdBlock } from "react-icons/md";

const User = ({ user }) => {
  console.log(user.username);
  const currentDate = new Date(user.createdAt);

  console.log(currentDate.getMonth());

  const formatedDate = {
    day: currentDate.getDay(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  };

  const { day, month, year } = formatedDate;
  return (
    <li className={styles.User}>
      <img className={styles.Avatar} src={avatar} alt="avatar" />
      <p className={styles.Name}>
        {user.firstName} {user.lastName}
      </p>
      <p className={styles.Username}>{user.username}</p>
      <p className={styles.Email}>{user.email}</p>
      <p className={styles.CreatedAt}>{`${day}/${month}/${year}`}</p>
      <p className={styles.Type}>{user.type}</p>
      {user.type !== "admin" && (
        <button className={styles.ToggleStatusBtn}>
          <MdBlock
            fontSize="2rem"
            color={user.status === "active" ? "inherit" : "#FF0000"}
          />
          {user.status === "active" ? (
            <p>Block</p>
          ) : (
            <p style={{ color: "#FF0000" }}>Unblock</p>
          )}
        </button>
      )}
    </li>
  );
};
export default User;
