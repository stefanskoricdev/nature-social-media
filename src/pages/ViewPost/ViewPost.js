import styles from "./ViewPost.module.scss";
import { formatDate } from "../../helpers/formatDate";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../store/AppProvider";
import avatar from "../../assets/img/avatarSmallSize.png";
import forest from "../../assets/img/forest.png";
import PostReactions from "../../components/PostsList/PostReactions/PostReactions";
import CommentsList from "../../components/CommentsList/CommentsList";

const ViewPost = () => {
  const appCtx = useContext(AppContext);
  const { setPosts, posts } = appCtx;

  const params = useParams();
  const { postId } = params;

  const post = posts.find((post) => post.id === +postId);

  if (!post) return;
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
          <CommentsList setPosts={setPosts} post={post} posts={posts} />
        </section>
      </section>
    </section>
  );
};

export default ViewPost;
