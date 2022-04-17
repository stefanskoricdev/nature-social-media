import styles from "./Post.module.scss";
import { formatDate } from "../../../helpers/formatDate";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import AuthContext from "../../../store/AuthProvider";
import avatar from "../../../assets/img/avatarSmallSize.png";
import forest from "../../../assets/img/forest.png";
import PostReactions from "../PostReactions/PostReactions";

const Post = ({ post }) => {
  const authCtx = useContext(AuthContext);
  const { currentUser } = authCtx;

  const isCurentUserAuthor =
    currentUser.username === post.userHandle ? true : false;

  const formatedDate = formatDate(post.createdAt);
  const { day, month, year } = formatedDate;

  const handleDeletePost = () => {};

  return (
    <section className={styles.Post}>
      {!post && <h2>No new posts</h2>}
      <header className={styles.PostHeader}>
        {isCurentUserAuthor && (
          <button onClick={handleDeletePost} className={styles.DeletePostBtn}>
            <MdDelete fontSize="1.8rem" />
          </button>
        )}
        <Link to={`/profile/${post.userHandle}`} className={styles.PostAvatar}>
          <img src={avatar} alt="avatar" />
        </Link>
        <div className={styles.PostMeta}>
          <Link
            to={`/profile/${post.userHandle}`}
            className={styles.PostAuthor}
          >{`@${post.userHandle}`}</Link>
          <ul>
            <li>{`Accessibility: ${post.accessibility}`}</li>
            <li>{`Type: ${post.type}`}</li>
          </ul>
          <p className={styles.PostCreatedAt}>{`${day}/${month}/${year}`}</p>
          <p className={styles.PostDescription}>{post.description}</p>
        </div>
      </header>
      <main className={styles.PostMain}>
        <Link to={`/view-post/${post.id}`}>
          <img src={forest} alt={post.name} />
        </Link>
      </main>
      <footer className={styles.PostFooter}>
        <PostReactions post={post} />
        <p className={styles.PostLocation}>{`${post.name}(${post.place})`}</p>
      </footer>
    </section>
  );
};

export default Post;
