import styles from "./CommentsList.module.scss";
import { useState, useContext } from "react";
import { CURRENT_DATE, POSTS_URL } from "../../util/constants";
import { useHttp } from "../../hooks/useHttp";
import { v4 as uuidv4 } from "uuid";
import AuthContext from "../../store/AuthProvider";
import avatar from "../../assets/img/avatarSmallSize.png";
import Comment from "./Comment/Comment";
import Spinner from "../UI/Spinner/Spinner";

const CommentsList = ({ setPosts, post, posts }) => {
  const { sendRequest: sendCommentRequest, isLoading } = useHttp();

  const [formData, setFormData] = useState({
    body: "",
  });

  const authCtx = useContext(AuthContext);
  const { currentUser } = authCtx;

  const { comments } = post;
  const commentsList = comments.map((comment) => {
    return <Comment key={comment.id} comment={comment} avatar={avatar} />;
  });

  const updateUi = (additionalData) => {
    setPosts((prevState) => {
      const targetedPostIndex = prevState.findIndex(
        (postItem) => postItem.id === post.id
      );
      const targetedPost = prevState[targetedPostIndex];
      let updatedItem = {
        ...targetedPost,
        comments: [...targetedPost.comments, additionalData.commentData],
      };
      prevState[targetedPostIndex] = updatedItem;
      return [...prevState];
    });
    setFormData({ body: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    const commentData = {
      author: currentUser.username,
      body: formData.body,
      createdAt: CURRENT_DATE.getTime(),
      id: uuidv4(),
    };

    const targetedPost = { ...post };
    let updatedPost = {
      ...targetedPost,
      comments: [...targetedPost.comments, commentData],
    };

    sendCommentRequest(
      {
        url: `${POSTS_URL}/${post.id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: { ...updatedPost },
      },
      updateUi,
      { commentData }
    );
  };

  return (
    <section className={styles.PostComments}>
      <form onSubmit={handleSubmitComment} className={styles.CommentsForm}>
        <div className={styles.CommentInput}>
          <img src={avatar} alt="avatar" />
          <input
            type="text"
            name="body"
            placeholder="Write a comment..."
            value={formData.body}
            onChange={handleChange}
          />
        </div>
        <button className={styles.SubmitCommentBtn}>
          {isLoading ? <Spinner /> : "Publish"}
        </button>
      </form>
      <ul className={styles.CommentsList}>{commentsList}</ul>
    </section>
  );
};

export default CommentsList;
