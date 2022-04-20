import styles from "./User.module.scss";
import { MdBlock } from "react-icons/md";
import { formatDate } from "../../../helpers/formatDate";
import avatar from "../../../assets/img/avatarSmallSize.png";
import { useHttp } from "../../../hooks/useHttp";
import { USERS_URL } from "../../../util/constants";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Spinner from "../../UI/Spinner/Spinner";
import Modal from "../../UI/Modal/Modal";
import ErrorModal from "../../UI/Modal/ErrorModal/ErrorModal";

const User = ({ user, users, setUsers }) => {
  const {
    sendRequest: sendUsersRequest,
    isLoading,
    error,
    setError,
  } = useHttp();

  const formatedDate = formatDate(user.createdAt);
  const { day, month, year } = formatedDate;

  const updateUi = (additionalData) => {
    const targetedUserIndex = users.findIndex(
      (user) => user.id === additionalData.userId
    );
    let targetedPost = users[targetedUserIndex];
    const allUsers = [...users];
    setUsers(() => {
      let updatedUser;
      updatedUser = {
        ...targetedPost,
        isActive: !targetedPost.isActive,
      };
      allUsers[targetedUserIndex] = updatedUser;
      return [...allUsers];
    });
  };

  const handleBlockUser = () => {
    const targetedUser = users.find((userItem) => userItem.id === user.id);
    console.log(targetedUser);
    const updatedUser = { ...targetedUser, isActive: !targetedUser.isActive };

    console.log(updatedUser);
    sendUsersRequest(
      {
        url: `${USERS_URL}/${user.id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedUser,
      },
      updateUi,
      {
        userId: user.id,
      }
    );
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
                color={user.isActive ? "inherit" : "#FF0000"}
              />
              {user.isActive ? (
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
