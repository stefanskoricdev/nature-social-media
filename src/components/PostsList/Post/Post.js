import styles from "./Post.module.scss";
import { formatDate } from "../../../helpers/formatDate";
import avatar from "../../../assets/img/avatarSmallSize.png";
import forest from "../../../assets/img/forest.png";
import PostReactions from "../PostReactions/PostReactions";

const Post = ({ post }) => {
  const formatedDate = formatDate(post.createdAt);
  const { day, month, year } = formatedDate;

  return (
    <section className={styles.Post}>
      <header className={styles.PostHeader}>
        <div className={styles.PostAvatar}>
          <img src={avatar} alt="avatar" />
        </div>
        <div className={styles.PostMeta}>
          <h3 className={styles.PostAuthor}>{`@${post.userHandle}`}</h3>
          <ul>
            <li>{`Accessibility: ${post.accessibility}`}</li>
            <li>{`Type: ${post.type}`}</li>
          </ul>
          <p className={styles.PostCreatedAt}>{`${day}/${month}/${year}`}</p>
          <p className={styles.PostDescription}>{post.description}</p>
        </div>
      </header>
      <main className={styles.PostMain}>
        <img src={forest} alt={post.name}></img>
      </main>
      <footer className={styles.PostFooter}>
        <PostReactions post={post} />
        <p className={styles.PostLocation}>{`${post.name}(${post.place})`}</p>
      </footer>
    </section>
  );
};

export default Post;
