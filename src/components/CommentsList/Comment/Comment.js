import styles from "./Comment.module.scss";
import { formatDate } from "../../../helpers/formatDate";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useHttp } from "../../../hooks/useHttp";
import { POSTS_URL } from "../../../util/constants";
import AuthContext from "../../../store/AuthProvider";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Modal from "../../UI/Modal/Modal";
import WarningModal from "../../UI/Modal/WarningModal/WarningModal";

const Comment = ({ comment, post, avatar, updateUi }) => {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [commentId, setCommentId] = useState(null);

  const {
    sendRequest: sendCommentsRequest,
    isLoading,
    error,
    setError,
  } = useHttp();

  const { userHandle, id } = post;

  const authCtx = useContext(AuthContext);
  const { currentUser } = authCtx;

  const formatedDate = formatDate(comment.createdAt);
  const { day, month, year } = formatedDate;

  const showDeleteCommentBtn =
    currentUser.username === userHandle ||
    currentUser.username === comment.author;

  const toggleWarningModalHandler = (e) => {
    setShowWarningModal((prevState) => !prevState);
    setError(null);
    if (e) {
      setCommentId(e.target.id);
    }
  };

  const handleDeleteComment = () => {
    const targetedPost = { ...post };
    let updatedPost = {
      ...targetedPost,
      comments: targetedPost.comments.filter(
        (comment) => comment.id !== commentId
      ),
    };
    sendCommentsRequest(
      {
        url: `${POSTS_URL}/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: { ...updatedPost },
      },
      updateUi,
      {
        commentData: null,
        action: "deletePost",
        commentId,
      }
    );
  };

  return (
    <>
      {showWarningModal && (
        <Backdrop handleClick={toggleWarningModalHandler}>
          <Modal>
            <WarningModal
              message="Are you sure you want to delete this comment?"
              onConfirm={handleDeleteComment}
              onDiscard={toggleWarningModalHandler}
              isLoading={isLoading}
              isError={error}
            />
          </Modal>
        </Backdrop>
      )}
      <li className={styles.Comment} key={comment.id}>
        {showDeleteCommentBtn && (
          <button
            onClick={toggleWarningModalHandler}
            className={styles.DeleteCommentBtn}
            id={comment.id}
          >
            <MdDelete fontSize="1.8rem" />
          </button>
        )}
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
    </>
  );
};

export default Comment;
