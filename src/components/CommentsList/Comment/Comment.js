import styles from "./Comment.module.scss";
import { formatDate } from "../../../helpers/formatDate";
import { Link } from "react-router-dom";

const Comment = ({ comment, avatar }) => {
  const formatedDate = formatDate(comment.createdAt);
  const { day, month, year } = formatedDate;

  return (
    <li className={styles.Comment} key={comment.id}>
      <div className={styles.CommentAvatar}>
        <Link to={`/profile/${comment.author}`}>
          <img src={avatar} alt="avatar" />
        </Link>
      </div>
      <div className={styles.CommentContent}>
        <Link
          to={`/profile/${comment.author}`}
          className={styles.CommentAuthor}
        >
          {comment.author}
        </Link>
        <p className={styles.CommentCreatedAt}>{`${day}/${month}/${year}`}</p>
        <p className={styles.CommentBody}>{comment.body}</p>
      </div>
    </li>
  );
};

export default Comment;
