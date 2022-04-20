import styles from "./Profile.module.scss";
import { MdEmail } from "react-icons/md";
import { RiFileUserFill } from "react-icons/ri";
import { BsCalendar2Date } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { formatDate } from "../../helpers/formatDate";
import { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import { USERS_URL } from "../../util/constants";
import { getUserActivity } from "../../helpers/getUserActivity";
import AppContext from "../../store/AppProvider";
import avatar from "../../assets/img/avatar.png";
import Post from "../../components/PostsList/Post/Post";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import ErrorModal from "../../components/UI/Modal/ErrorModal/ErrorModal";

const Profile = () => {
  const [users, setUsers] = useState();
  const { sendRequest: usersRequest, isLoading, error, setError } = useHttp();

  const params = useParams();
  const { username } = params;

  const appCtx = useContext(AppContext);
  const { posts } = appCtx;

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

  if (error) {
    return (
      <Backdrop handleClick={handleCloseBackdrop}>
        <Modal>
          <ErrorModal message={error} />
        </Modal>
      </Backdrop>
    );
  }

  if (!users || !posts) return;
  const user = users.find((user) => user.username === username);

  const formatedDate = formatDate(user.dateOfBirth);
  const { day, month, year } = formatedDate;

  const userActivity = getUserActivity(posts, username);

  const currentUserPostsList = posts.filter(
    (post) => post.userHandle === user.username
  );
  const sortedList = currentUserPostsList.sort(
    (a, b) => b.upVotes.length - a.upVotes.length
  );

  const postsListEl = sortedList.map((post) => (
    <Post key={post.id} post={post} />
  ));

  return (
    <section className={styles.Profile}>
      {isLoading && (
        <Backdrop>
          <Spinner color="#00b960" />
        </Backdrop>
      )}
      <header className={styles.ProfileHeader}>
        <section className={styles.ProfileCover}>
          <section className={styles.ProfileImg}>
            <img src={avatar} alt="avatar" />
          </section>
        </section>
        <section className={styles.ProfileTitle}>
          <h3
            className={styles.ProfileName}
          >{`${user.firstName} ${user.lastName}`}</h3>
          <p className={styles.ProfileUsername}>{`@${user.username}`}</p>
        </section>
        <section className={styles.ProfileInfo}>
          <section className={styles.UserInformation}>
            <h2>User information</h2>
            <p>
              <MdEmail color="#161616" fontSize="1.6rem" />
              <span>{user.email}</span>
            </p>
            <p>
              <RiFileUserFill color="#161616" fontSize="1.6rem" />
              <span className={styles.UserType}>{user.type}</span>
            </p>
            <p>
              <BsCalendar2Date color="#161616" fontSize="1.6rem" />
              <span>{`${day}/${month}/${year}`}</span>
            </p>
          </section>
          <section className={styles.UserActivity}>
            <div>
              <span>{userActivity.userPublications}</span>
              <p>Publications</p>
            </div>
            <div>
              <span>{userActivity.userReactions}</span>
              <p>Reactions</p>
            </div>
            <div>
              <span>{userActivity.userComments}</span>
              <p>Comments</p>
            </div>
          </section>
        </section>
      </header>
      <main className={styles.ProfileMain}>{postsListEl}</main>
    </section>
  );
};

export default Profile;
