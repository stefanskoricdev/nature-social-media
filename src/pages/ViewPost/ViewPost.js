import styles from "./ViewPost.module.scss";
import { mockData } from "../../services/mockData";
import { formatDate } from "../../helpers/formatDate";
import { Link } from "react-router-dom";
import avatar from "../../assets/img/avatarSmallSize.png";
import forest from "../../assets/img/forest.png";
import PostReactions from "../../components/PostsList/PostReactions/PostReactions";
import CommentsList from "../../components/CommentsList/CommentsList";

const ViewPost = () => {
  const { posts } = mockData;
  const post = posts[0];

  const formatedDate = formatDate(post.createdAt);
  const { day, month, year } = formatedDate;

  return (
    <section className={styles.ViewPost}>
      <section className={styles.ViewPostLeftContent}>
        <ul>
          <li>{`Accessability: ${post.accessibility}`}</li>
          <li>{`Type: ${post.type}`}</li>
        </ul>
        <section className={styles.ViewPostImg}>
          <img src={forest} alt={post.name} />
          <footer className={styles.ViewPostFooter}>
            <PostReactions post={post} />
            <p
              className={styles.PostLocation}
            >{`${post.name}(${post.place})`}</p>
          </footer>
        </section>
      </section>
      <section className={styles.ViewPostRightContent}>
        <header className={styles.ViewPostHeader}>
          <section className={styles.PostInfo}>
            <Link to={`/profile/${post.userHandle}`}>
              <img
                className={styles.PostInfoAvatar}
                src={avatar}
                alt="avatar"
              />
            </Link>
            <div className={styles.PostInfoMeta}>
              <Link
                to={`/profile/${post.userHandle}`}
                className={styles.PostAuthor}
              >{`@${post.userHandle}`}</Link>
              <p
                className={styles.PostCreatedAt}
              >{`${day}/${month}/${year}`}</p>
            </div>
          </section>
        </header>
        <p className={styles.PostDescription}>{post.description}</p>
        <section className={styles.PostReactions}>
          <PostReactions post={post} hideLocation={true} />
        </section>
        <section className={styles.PostComments}>
          <CommentsList post={post} />
        </section>
      </section>
    </section>
  );
};

export default ViewPost;
