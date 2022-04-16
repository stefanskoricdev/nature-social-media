import styles from "./Post.module.scss";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import avatar from "../../../assets/img/avatarSmallSize.png";
import forest from "../../../assets/img/forest.png";

const Post = ({ post }) => {
  const currentDate = new Date(post.createdAt);

  const formatedDate = {
    day: currentDate.getDay(),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  };

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
        <section className={styles.PostReactions}>
          <button className={styles.ReactionItemBtn}>
            <AiFillLike fontSize="2rem" color="rgb(168, 167, 167)" />
            <span>{post.upVotes.length}</span>
          </button>
          <button
            style={{ color: "rgb(0, 185, 96)" }}
            className={styles.ReactionItemBtn}
          >
            <AiFillDislike fontSize="2rem" />
            <span>{post.downVotes.length}</span>
          </button>
          <button className={styles.ReactionItemBtn}>
            <FaCommentAlt fontSize="1.7rem" color="rgb(168, 167, 167)" />
            <span>{post.comments.length}</span>
          </button>
        </section>
        <p className={styles.PostLocation}>{`${post.name}(${post.place})`}</p>
      </footer>
    </section>
  );
};

export default Post;
