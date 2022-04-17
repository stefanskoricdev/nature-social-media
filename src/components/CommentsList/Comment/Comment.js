import styles from "./Comment.module.scss";
import { formatDate } from "../../../helpers/formatDate";

const Comment = ({ comment, avatar }) => {
  const formatedDate = formatDate(comment.createdAt);
  const { day, month, year } = formatedDate;

  return (
    <li className={styles.Comment} key={comment.id}>
      <div className={styles.CommentAvatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <div className={styles.CommentContent}>
        <h3 className={styles.CommentAuthor}>{comment.author}</h3>
        <p className={styles.CommentCreatedAt}>{`${day}/${month}/${year}`}</p>
        <p className={styles.CommentBody}>{comment.body}</p>
      </div>
    </li>
  );
};

export default Comment;
