import styles from "./AddPostForm.module.scss";
import { Fragment } from "react";

const AddPostForm = () => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default AddPostForm;
