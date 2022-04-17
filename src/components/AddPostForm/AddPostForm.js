import styles from "./AddPostForm.module.scss";
import { Fragment, useState } from "react";
import { CURRENT_DATE } from "../../util/constants";

const AddPostForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    accessibility: "",
    type: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      ...formData,
      userHandle: "stefan.skoric",
      createdAt: CURRENT_DATE.getTime(),
      upVotes: [],
      downVotes: [],
      comments: [],
    };

    console.log(newData);
  };

  return (
    <Fragment>
      <h2 className={styles.AddPostFormTitle}>
        Add new post<span>.</span>
      </h2>
      <form onSubmit={handleSubmit} className={styles.AddPostForm}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="place"
          placeholder="Place"
          value={formData.place}
          onChange={handleChange}
        />
        <select
          name="accessibility"
          value={formData.accessibility}
          onChange={handleChange}
        >
          <option value="" disabled>
            Accessibility
          </option>
          <option value="By passenger car">By passenger car</option>
          <option value="Off-road vehicle">Off-road vehicle</option>
          <option value="It is not possible to come by vehicle">
            It is not possible to come by vehicle
          </option>
        </select>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="" disabled>
            Type
          </option>
          <option value="Excursion site">Excursion site</option>
          <option value="Waterfall">Waterfall</option>
          <option value="Mountain trail">Mountain trail</option>
        </select>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <button className={styles.PublishBtn}>Publish</button>
        <button className={styles.DiscardBtn}>Discard</button>
      </form>
    </Fragment>
  );
};

export default AddPostForm;
