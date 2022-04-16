import styles from "./AddPost.module.scss";
import coverMain from "../../assets/img/NewPostCover/coverMain.png";
import mountainTrail from "../../assets/img/NewPostCover/mountainTrail.png";
import waterfall from "../../assets/img/NewPostCover/waterfall.png";
import logoSmall from "../../assets/img/logoSmall.png";

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
        <h2 className={styles.AddPostFormTitle}>
          Add new post<span>.</span>
        </h2>
        <form className={styles.AddPostForm}>
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="place" placeholder="Place" />
          <select>
            <option value="" disabled selected>
              Accessability
            </option>
            <option value="By passenger car">By passenger car</option>
            <option value="Off-road vehicle">Off-road vehicle</option>
            <option value="It is not possible to come by vehicle">
              It is not possible to come by vehicle
            </option>
          </select>
          <select>
            <option value="" disabled selected>
              Type
            </option>
            <option value="Excursion site">Excursion site</option>
            <option value="Waterfall">Waterfall</option>
            <option value="Mountain trail">Mountain trail</option>
          </select>
          <input type="text" name="description" placeholder="Description" />
          <button className={styles.PublishBtn}>Publish</button>
          <button className={styles.DiscardBtn}>Discard</button>
        </form>
      </section>
    </section>
  );
};

export default AddPost;
