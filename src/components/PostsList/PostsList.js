import { mockData } from "../../services/mockData";
import Post from "./Post/Post";

const PostsList = () => {
  const { posts } = mockData;
  const postsListEl = posts.map((post) => <Post key={post.id} post={post} />);

  return <section>{postsListEl}</section>;
};

export default PostsList;
