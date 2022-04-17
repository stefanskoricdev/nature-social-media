import styles from "./PostReactions.module.scss";
import { Fragment } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const PostReactions = ({ post }) => {
  const didUserLike = post.upVotes.find((user) => user === "stefan.skoric");
  const didUserDislike = post.downVotes.find(
    (user) => user === "stefan.skoric"
  );

  return (
    <Fragment>
      <section className={styles.PostReactions}>
        <button className={styles.ReactionItemBtn}>
          <AiFillLike
            fontSize="2.2rem"
            color={didUserLike ? "rgb(0, 185, 96)" : "rgb(168, 167, 167)"}
          />
          <span>{post.upVotes.length}</span>
        </button>
        <button className={styles.ReactionItemBtn}>
          <AiFillDislike
            color={didUserDislike ? "rgb(0, 185, 96)" : "rgb(168, 167, 167)"}
            fontSize="2.2rem"
          />
          <span>{post.downVotes.length}</span>
        </button>
        <Link to={`/view-post/${post.id}`} className={styles.ReactionItemBtn}>
          <FaCommentAlt fontSize="1.9rem" color="rgb(168, 167, 167)" />
          <span>{post.comments.length}</span>
        </Link>
      </section>
    </Fragment>
  );
};

export default PostReactions;
