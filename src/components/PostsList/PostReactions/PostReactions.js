import styles from "./PostReactions.module.scss";
import { Fragment } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";

const PostReactions = ({ post }) => {
  return (
    <Fragment>
      <section className={styles.PostReactions}>
        <button className={styles.ReactionItemBtn}>
          <AiFillLike fontSize="2.2rem" color="rgb(168, 167, 167)" />
          <span>{post.upVotes.length}</span>
        </button>
        <button
          style={{ color: "rgb(0, 185, 96)" }}
          className={styles.ReactionItemBtn}
        >
          <AiFillDislike fontSize="2.2rem" />
          <span>{post.downVotes.length}</span>
        </button>
        <button className={styles.ReactionItemBtn}>
          <FaCommentAlt fontSize="1.9rem" color="rgb(168, 167, 167)" />
          <span>{post.comments.length}</span>
        </button>
      </section>
    </Fragment>
  );
};

export default PostReactions;
