import styles from "./RegisterForm.module.scss";
import { useState, useContext, Fragment } from "react";
import { useHttp } from "../../hooks/useHttp";
import { REGISTER_URL, CURRENT_DATE } from "../../util/constants";
import { Link } from "react-router-dom";
import RadioBtn from "./RadioBtn/RadioBtn";
import AuthContext from "../../store/AuthProvider";
import Spinner from "../UI/Spinner/Spinner";
import Backdrop from "../UI/Backdrop/Backdrop";
import Modal from "../UI/Modal/Modal";
import ErrorModal from "../UI/Modal/ErrorModal/ErrorModal";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    type: "user",
  });

  const [userType, setUserType] = useState("user");

  const { sendRequest, isLoading, error, setError } = useHttp();

  const authCtx = useContext(AuthContext);
  const { loginHandler } = authCtx;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { confirmPassword, ...restOfData } = formData;
    const transformedData = {
      ...restOfData,
      createdAt: CURRENT_DATE.getTime(),
      status: "active",
    };

    sendRequest(
      {
        url: REGISTER_URL,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: transformedData,
      },
      loginHandler
    );
  };

  const handleUserTypeChange = (e) => {
    const type = e.target.getAttribute("data-type");
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
    setUserType(type);
  };

  const closeBackdropHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && (
        <Backdrop handleClick={closeBackdropHandler}>
          <Modal>
            <ErrorModal message={error} />
          </Modal>
        </Backdrop>
      )}
      <form onSubmit={handleSubmit} className={styles.RegisterForm}>
        <h3>
          Create new account<span>.</span>
        </h3>
        <div className={styles.PersonalInfo}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        <div className={styles.UserType}>
          <RadioBtn
            labelTitle="User"
            checked={userType === "user" ? true : false}
            handleChange={handleUserTypeChange}
            dataType="user"
            value="user"
          />
          <RadioBtn
            labelTitle="Admin"
            checked={userType === "admin" ? true : false}
            handleChange={handleUserTypeChange}
            dataType="admin"
            value="admin"
          />
        </div>
        <button className={styles.SignupBtn}>
          {!isLoading ? "Sign Up" : <Spinner />}
        </button>
        <hr />
        <p className={styles.Login}>
          Already have account? <Link to="/">Login!</Link>
        </p>
      </form>
    </Fragment>
  );
};

export default RegisterForm;
