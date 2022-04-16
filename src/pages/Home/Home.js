import styles from "./Home.module.scss";
import PostsList from "../../components/PostsList/PostsList";

const Home = () => {
  return (
    <section className={styles.Home}>
      <PostsList />
    </section>
  );
};

export default Home;
