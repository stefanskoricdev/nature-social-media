import styles from "./PostReactions.module.scss";
import { Fragment, useContext } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useHttp } from "../../../hooks/useHttp";
import { POSTS_URL } from "../../../util/constants";
import AppContext from "../../../store/AppProvider";
import AuthContext from "../../../store/AuthProvider";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Modal from "../../UI/Modal/Modal";
import ErrorModal from "../../UI/Modal/ErrorModal/ErrorModal";

const PostReactions = ({ post }) => {
  const { sendRequest: sendVoteRequest, error, setError } = useHttp();

  const appCtx = useContext(AppContext);
  const { posts, setPosts } = appCtx;

  const authCtx = useContext(AuthContext);
  const { currentUser } = authCtx;
  //Check if user liked or disliked this post already
  const didUserLike = post.upVotes.find(
    (user) => user === currentUser.username
  );
  const didUserDislike = post.downVotes.find(
    (user) => user === currentUser.username
  );

  const targetedPostIndex = posts.findIndex(
    (postItem) => postItem.id === post.id
  );
  const targetedPost = posts[targetedPostIndex];

  const handleNeutralizeLike = () => {
    let updatedItem;
    const filteredVotes = targetedPost.upVotes.filter(
      (vote) => vote !== currentUser.username
    );
    updatedItem = { ...targetedPost, upVotes: [...filteredVotes] };
    setPosts((prevState) => {
      prevState[targetedPostIndex] = updatedItem;
      return [...prevState];
    });
  };

  const handleNeutralizeDislike = () => {
    let updatedItem;
    const filteredVotes = targetedPost.downVotes.filter(
      (vote) => vote !== currentUser.username
    );
    updatedItem = { ...targetedPost, downVotes: [...filteredVotes] };
    setPosts((prevState) => {
      prevState[targetedPostIndex] = updatedItem;
      return [...prevState];
    });
  };

  const updateUi = (additionalData) => {
    setPosts((prevState) => {
      const { event, updatedItem } = additionalData;
      if (event.target.id === "upvote") {
        if (didUserLike) {
          handleNeutralizeLike();
        }
      } else {
        if (didUserDislike) {
          handleNeutralizeDislike();
        }
      }
      prevState[targetedPostIndex] = updatedItem;
      return [...prevState];
    });
  };

  const voteRequestHandler = (event) => {
    let updatedItem;
    if (event.target.id === "upvote") {
      updatedItem = {
        ...targetedPost,
        upVotes: [...targetedPost.upVotes, currentUser.username],
        downVotes: targetedPost.downVotes.filter(
          (vote) => vote !== currentUser.username
        ),
      };
    } else {
      updatedItem = {
        ...targetedPost,
        downVotes: [...targetedPost.downVotes, currentUser.username],
        upVotes: targetedPost.upVotes.filter(
          (vote) => vote !== currentUser.username
        ),
      };
    }
    sendVoteRequest(
      {
        url: `${POSTS_URL}/${post.id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: { ...updatedItem },
      },
      updateUi,
      { event, updatedItem }
    );
  };

  const handleBackdropClose = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && (
        <Backdrop handleClick={handleBackdropClose}>
          <Modal>
            <ErrorModal message={error} />
          </Modal>
        </Backdrop>
      )}
      <section className={styles.PostReactions}>
        <button
          id="upvote"
          onClick={voteRequestHandler}
          className={styles.ReactionItemBtn}
        >
          <AiFillLike
            fontSize="2.2rem"
            color={didUserLike ? "rgb(0, 185, 96)" : "rgb(168, 167, 167)"}
          />
          <span>{post.upVotes.length}</span>
        </button>
        <button
          id="downvote"
          onClick={voteRequestHandler}
          className={styles.ReactionItemBtn}
        >
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
