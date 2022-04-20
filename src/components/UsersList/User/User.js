import styles from "./User.module.scss";
import { MdBlock } from "react-icons/md";
import { formatDate } from "../../../helpers/formatDate";
import { useHttp } from "../../../hooks/useHttp";
import { BLOCKED_USERS_URL } from "../../../util/constants";
import { useContext } from "react";
import avatar from "../../../assets/img/avatarSmallSize.png";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Spinner from "../../UI/Spinner/Spinner";
import Modal from "../../UI/Modal/Modal";
import ErrorModal from "../../UI/Modal/ErrorModal/ErrorModal";
import AuthContext from "../../../store/AuthProvider";

const User = ({ user }) => {
  const {
    sendRequest: sendBlockedUsersReq,
    isLoading,
    error,
    setError,
  } = useHttp();

  const authCtx = useContext(AuthContext);
  const { blockedUsers, setBlockedUsers } = authCtx;

  const isUserBlocked = blockedUsers.find(
    (blockedUser) => blockedUser.username === user.username
  );

  const formatedDate = formatDate(user.createdAt);
  const { day, month, year } = formatedDate;

  const updateUi = (data) => {
    let updatedBlockedUsers;
    setBlockedUsers((prevState) => {
      const blockedUser = prevState.find(
        (item) => item.username === user.username
      );
      if (blockedUser) {
        updatedBlockedUsers = [...prevState].filter(
          (data) => data.username !== user.username
        );
      } else {
        updatedBlockedUsers = [...prevState, data];
      }
      prevState = updatedBlockedUsers;
      return [...prevState];
    });
  };

  const handleBlockUser = () => {
    const allBlockedUsers = [...blockedUsers];
    const blockedUser = allBlockedUsers.find(
      (item) => item.username === user.username
    );
    if (blockedUser) {
      const { id } = blockedUser;

      sendBlockedUsersReq(
        {
          url: `${BLOCKED_USERS_URL}/${id}`,
          method: "DELETE",
        },
        updateUi,
        {
          username: user.username,
        }
      );
    } else {
      sendBlockedUsersReq(
        {
          url: BLOCKED_USERS_URL,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: { username: user.username },
        },
        updateUi
      );
    }
  };

  const handleBackdropClose = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <Backdrop handleClick={handleBackdropClose}>
          <Modal>
            <ErrorModal message={error} />
          </Modal>
        </Backdrop>
      )}
      <li className={styles.User}>
        <img className={styles.Avatar} src={avatar} alt="avatar" />
        <p className={styles.Name}>
          {user.firstName} {user.lastName}
        </p>
        <p className={styles.Username}>{user.username}</p>
        <p className={styles.Email}>{user.email}</p>
        <p className={styles.CreatedAt}>{`${day}/${month}/${year}`}</p>
        <p className={styles.Type}>{user.type}</p>
        {user.type !== "admin" &&
          (isLoading ? (
            <Spinner color="#00b960" />
          ) : (
            <button
              onClick={handleBlockUser}
              className={styles.ToggleStatusBtn}
            >
              <MdBlock
                fontSize="2rem"
                color={!isUserBlocked ? "inherit" : "#FF0000"}
              />
              {!isUserBlocked ? (
                <p>Block</p>
              ) : (
                <p style={{ color: "#FF0000" }}>Unblock</p>
              )}
            </button>
          ))}
      </li>
    </>
  );
};
export default User;
