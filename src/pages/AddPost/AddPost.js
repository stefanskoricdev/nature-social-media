import styles from "./AddPost.module.scss";
import coverMain from "../../assets/img/NewPostCover/coverMain.png";
import mountainTrail from "../../assets/img/NewPostCover/mountainTrail.png";
import waterfall from "../../assets/img/NewPostCover/waterfall.png";
import logoSmall from "../../assets/img/logoSmall.png";
import AddPostForm from "../../components/AddPostForm/AddPostForm";

const AddPost = () => {
  return (
    <section className={styles.AddPost}>
      <section className={styles.AddPostCover}>
        <section className={styles.AddPostImageWrapper}>
          <img
            className={styles.CoverMain}
            src={coverMain}
            alt="cover-nature"
          />
          <img
            className={styles.MountainTrail}
            src={mountainTrail}
            alt="mountain"
          />
          <img className={styles.Waterfall} src={waterfall} alt="waterfall" />
        </section>
        <h2 className={styles.AddPostTitle}>Share your new post</h2>
        <img className={styles.AddPostLogo} src={logoSmall} alt="logo" />
      </section>
      <section className={styles.AddPostContent}>
        <AddPostForm />
      </section>
    </section>
  );
};

export default AddPost;
