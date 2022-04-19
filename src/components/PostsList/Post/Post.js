import styles from "./Post.module.scss";
import { formatDate } from "../../../helpers/formatDate";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useContext, useState } from "react";
import { useHttp } from "../../../hooks/useHttp";
import { POSTS_URL } from "../../../util/constants";
import AuthContext from "../../../store/AuthProvider";
import avatar from "../../../assets/img/avatarSmallSize.png";
import forest from "../../../assets/img/forest.png";
import PostReactions from "../PostReactions/PostReactions";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Modal from "../../UI/Modal/Modal";
import WarningModal from "../../UI/Modal/WarningModal/WarningModal";

const Post = ({ post, posts, setPosts }) => {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const {
    sendRequest: sendPostsRequest,
    isLoading,
    error,
    setError,
  } = useHttp();

  const authCtx = useContext(AuthContext);
  const { currentUser } = authCtx;

  const isCurentUserAuthor =
    currentUser.username === post.userHandle ? true : false;

  const formatedDate = formatDate(post.createdAt);
  const { day, month, year } = formatedDate;

  const toggleWarningModalHandler = () => {
    setShowWarningModal((prevState) => !prevState);
    setError(null);
  };

  const updateUi = () => {
    setPosts((prevState) =>
      prevState.filter((postItem) => postItem.id !== post.id)
    );
    toggleWarningModalHandler();
  };

  const handleDeletePost = () => {
    sendPostsRequest(
      {
        url: `${POSTS_URL}/${post.id}`,
        method: "DELETE",
      },
      updateUi
    );
  };

  return (
    <section className={styles.Post}>
      {showWarningModal && (
        <Backdrop handleClick={toggleWarningModalHandler}>
          <Modal>
            <WarningModal
              message="Are you sure you want to delete this post?"
              onConfirm={handleDeletePost}
              onDiscard={toggleWarningModalHandler}
              isLoading={isLoading}
              isError={error}
            />
          </Modal>
        </Backdrop>
      )}
      <header className={styles.PostHeader}>
        {isCurentUserAuthor && (
          <button
            onClick={toggleWarningModalHandler}
            className={styles.DeletePostBtn}
          >
            <MdDelete fontSize="1.8rem" />
          </button>
        )}
        <Link to={`/profile/${post.userHandle}`} className={styles.PostAvatar}>
          <img src={avatar} alt="avatar" />
        </Link>
        <div className={styles.PostMeta}>
          <Link
            to={`/profile/${post.userHandle}`}
            className={styles.PostAuthor}
          >{`@${post.userHandle}`}</Link>
          <ul>
            <li>{`Accessibility: ${post.accessibility}`}</li>
            <li>{`Type: ${post.type}`}</li>
          </ul>
          <p className={styles.PostCreatedAt}>{`${day}/${month}/${year}`}</p>
          <p className={styles.PostDescription}>{post.description}</p>
        </div>
      </header>
      <main className={styles.PostMain}>
        <Link to={`/view-post/${post.id}`}>
          <img src={forest} alt={post.name} />
        </Link>
      </main>
      <footer className={styles.PostFooter}>
        <PostReactions post={post} />
        <p className={styles.PostLocation}>{`${post.name}(${post.place})`}</p>
      </footer>
    </section>
  );
};

export default Post;
