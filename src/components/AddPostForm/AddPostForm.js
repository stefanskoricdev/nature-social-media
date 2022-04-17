import styles from "./AddPostForm.module.scss";
import { Fragment, useState, useContext } from "react";
import { CURRENT_DATE, POSTS_URL } from "../../util/constants";
import { useHttp } from "../../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/AuthProvider";
import AppContext from "../../store/AppProvider";
import Backdrop from "../UI/Backdrop/Backdrop";
import Modal from "../UI/Modal/Modal";
import ErrorModal from "../UI/Modal/ErrorModal/ErrorModal";
import Spinner from "../UI/Spinner/Spinner";

const AddPostForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    accessibility: "",
    type: "",
    description: "",
  });

  const { sendRequest: sendNewPostReq, isLoading, error, setError } = useHttp();

  const authCtx = useContext(AuthContext);
  const { currentUser } = authCtx;

  const appCtx = useContext(AppContext);
  const { setPosts } = appCtx;

  const navigate = useNavigate();

  const updateUi = (data) => {
    setPosts((prevState) => [...prevState, data]);
    navigate("/home");
  };

  const handleBackdrop = () => {
    setError(null);
  };

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
      userHandle: currentUser.username,
      createdAt: CURRENT_DATE.getTime(),
      upVotes: [],
      downVotes: [],
      comments: [],
    };

    sendNewPostReq(
      {
        url: POSTS_URL,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newData,
      },
      updateUi
    );
  };

  return (
    <Fragment>
      {error && (
        <Backdrop handleClick={handleBackdrop}>
          <Modal>
            <ErrorModal message={error} />
          </Modal>
        </Backdrop>
      )}
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
        <button className={styles.PublishBtn}>
          {!isLoading ? "Publish" : <Spinner />}
        </button>
        <button className={styles.DiscardBtn}>Discard</button>
      </form>
    </Fragment>
  );
};

export default AddPostForm;
