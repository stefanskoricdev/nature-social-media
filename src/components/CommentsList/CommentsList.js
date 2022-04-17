import styles from "./CommentsList.module.scss";
import avatar from "../../assets/img/avatarSmallSize.png";
import Comment from "./Comment/Comment";

const CommentsList = ({ post }) => {
  const { comments } = post;

  const commentsList = comments.map((comment) => {
    return <Comment key={comment.id} comment={comment} avatar={avatar} />;
  });

  return (
    <section className={styles.PostComments}>
      <form className={styles.CommentsForm}>
        <div className={styles.CommentInput}>
          <img src={avatar} alt="avatar" />
          <input type="text" name="comment" placeholder="Write a comment..." />
        </div>
        <button className={styles.SubmitCommentBtn}>Publish</button>
      </form>
      <ul className={styles.CommentsList}>{commentsList}</ul>
    </section>
  );
};

export default CommentsList;
