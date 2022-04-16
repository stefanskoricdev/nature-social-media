import styles from "./Profile.module.scss";
import { mockData } from "../../services/mockData";
import { MdEmail } from "react-icons/md";
import { RiFileUserFill } from "react-icons/ri";
import { BsCalendar2Date } from "react-icons/bs";
import avatar from "../../assets/img/avatar.png";
import Post from "../../components/PostsList/Post/Post";

const Profile = () => {
  const { users, posts } = mockData;
  const user = users[0];

  const currentUserPostsList = posts.filter(
    (post) => post.userHandle === user.username
  );
  const sortedList = currentUserPostsList.sort(
    (a, b) => b.upVotes.length - a.upVotes.length
  );

  const postsListEl = sortedList.map((post) => <Post post={post} />);

  return (
    <section className={styles.Profile}>
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
              <span>{user.createdAt}</span>
            </p>
          </section>
          <section className={styles.UserActivity}>
            <div>
              <span>22</span>
              <p>Publications</p>
            </div>
            <div>
              <span>12</span>
              <p>Reactions</p>
            </div>
            <div>
              <span>122</span>
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
