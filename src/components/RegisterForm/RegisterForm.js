import styles from "./RegisterForm.module.scss";
import { useState, useContext, useEffect } from "react";
import { useHttp } from "../../hooks/useHttp";
import {
  USERS_URL,
  CURRENT_DATE,
  EMAIL_REGEX,
  EMPTY_INPUT_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  NO_MATCH_PASSWORD_MESSAGE,
  CREDENTIALS_TAKEN_MESSAGE,
  INVALID_PASSWORD_MESSAGE,
} from "../../util/constants";
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

  const [users, setUsers] = useState();

  const { sendRequest: SendRegRequest, isLoading, error, setError } = useHttp();

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

    const userExists = users.find(
      (user) =>
        user.username === formData.username || user.email === formData.email
    );

    const isInputEmpty = Object.values(formData).some((input) => {
      if (input === "" || input === undefined) {
        return true;
      }
      return false;
    });

    if (isInputEmpty) {
      setError(EMPTY_INPUT_MESSAGE);
      return;
    }
    if (!EMAIL_REGEX.test(formData.email)) {
      setError(INVALID_EMAIL_MESSAGE);
      return;
    }
    if (formData.password.length < 6) {
      setError(INVALID_PASSWORD_MESSAGE);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(NO_MATCH_PASSWORD_MESSAGE);
      return;
    }
    if (userExists) {
      setError(CREDENTIALS_TAKEN_MESSAGE);
      return;
    }

    const { confirmPassword, ...restOfData } = formData;
    const transformedData = {
      ...restOfData,
      createdAt: CURRENT_DATE.getTime(),
    };

    SendRegRequest(
      {
        url: USERS_URL,
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

  const updateUsers = (data) => {
    setUsers([...data]);
  };

  useEffect(() => {
    SendRegRequest({ url: USERS_URL }, updateUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {error && (
        <Backdrop handleClick={closeBackdropHandler}>
          <Modal>
            <ErrorModal message={error} />
          </Modal>
        </Backdrop>
      )}
      <form noValidate onSubmit={handleSubmit} className={styles.RegisterForm}>
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
    </>
  );
};

export default RegisterForm;
