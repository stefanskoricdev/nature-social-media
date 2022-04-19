import { useContext, Fragment } from "react";
import AppContext from "../../store/AppProvider";
import NoPosts from "../NoPosts/NoPosts";
import Post from "./Post/Post";
import Backdrop from "../UI/Backdrop/Backdrop";
import Spinner from "../UI/Spinner/Spinner";
import Modal from "../UI/Modal/Modal";
import ErrorModal from "../UI/Modal/ErrorModal/ErrorModal";

const PostsList = () => {
  const appCtx = useContext(AppContext);
  const { posts, isLoading, error, setError, setPosts } = appCtx;

  const updateUi = (args) => {
    setPosts((prevState) => {
      const {
        event,
        updatedItem,
        didUserLike,
        didUserDislike,
        handleNeutralizeLike,
        handleNeutralizeDislike,
        targetedPostIndex,
      } = args;
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

  const handleCloseBackdrop = () => {
    setError(null);
  };

  const sortedList = posts.sort((a, b) => b.upVotes.length - a.upVotes.length);
  const postsListEl = sortedList.map((post) => (
    <Post
      key={post.id}
      post={post}
      posts={posts}
      setPosts={setPosts}
      updateUi={updateUi}
    />
  ));

  return (
    <Fragment>
      {!isLoading && error && (
        <Backdrop handleClick={handleCloseBackdrop}>
          <Modal>
            <ErrorModal message={error} />
          </Modal>
        </Backdrop>
      )}
      {isLoading && (
        <Backdrop>
          <Spinner />
        </Backdrop>
      )}
      <section>
        {postsListEl.length > 0 ? (
          postsListEl
        ) : isLoading === false && !error && postsListEl.length < 1 ? (
          <NoPosts />
        ) : null}
      </section>
    </Fragment>
  );
};

export default PostsList;
