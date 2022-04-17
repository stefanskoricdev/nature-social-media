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
  const { posts, isLoading, error, setError } = appCtx;

  const postsListEl = posts.map((post) => <Post key={post.id} post={post} />);

  const handleCloseBackdrop = () => {
    setError(null);
  };

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
