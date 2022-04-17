import { useContext } from "react";
import AppContext from "../../store/AppProvider";
import NoPosts from "../NoPosts/NoPosts";
import Post from "./Post/Post";

const PostsList = () => {
  const appCtx = useContext(AppContext);
  const { posts } = appCtx;

  const postsListEl = posts.map((post) => <Post key={post.id} post={post} />);

  return (
    <section>{postsListEl.length > 0 ? postsListEl : <NoPosts />}</section>
  );
};

export default PostsList;
