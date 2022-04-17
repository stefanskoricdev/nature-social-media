import styles from "./NoPosts.module.scss";
import { BsFillFilePostFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const NoPosts = () => {
  return (
    <section className={styles.NoPosts}>
      <BsFillFilePostFill fontSize="40rem" color="#a8a7a7" />
      <h2>No posts yet!</h2>
      <p>Create your first post and connect with people around you.</p>
      <Link to="/add-new-post">Create new</Link>
    </section>
  );
};

export default NoPosts;
