import styles from "./ViewPost.module.scss";
import { mockData } from "../../services/mockData";
import avatar from "../../assets/img/avatarSmallSize.png";
import forest from "../../assets/img/forest.png";
import PostReactions from "../../components/PostsList/PostReactions/PostReactions";
import CommentsList from "../../components/CommentsList/CommentsList";

const ViewPost = () => {
  const { posts } = mockData;
  const post = posts[0];

  const currentDate = new Date(post.createdAt);

  const formatedDate = {
    day: currentDate.getDay(),
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  };
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
            <img className={styles.PostInfoAvatar} src={avatar} alt="avatar" />
            <div className={styles.PostInfoMeta}>
              <h3 className={styles.PostAuthor}>{`@${post.userHandle}`}</h3>
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
