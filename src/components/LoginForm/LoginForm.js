import styles from "./LoginForm.module.scss";
import { useState, useContext, Fragment } from "react";
import { useHttp } from "../../hooks/useHttp";
import { LOGIN_URL } from "../../util/constants";
import AuthContext from "../../store/AuthProvider";
import togglePassword from "../../assets/img/togglePassword.png";
import Backdrop from "../UI/Backdrop/Backdrop";
import Modal from "../UI/Modal/Modal";
import ErrorModal from "../UI/Modal/ErrorModal/ErrorModal";
import Spinner from "../UI/Spinner/Spinner";

/* const LOGIN_URL = "http://localhost:3000/login"; */

const LoginForm = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
    sendRequest(
      {
        url: LOGIN_URL,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData,
      },
      loginHandler
    );
  };

  const togglePasswordShow = (e) => {
    e.preventDefault();
    setPasswordShow((prevState) => !prevState);
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
      <form onSubmit={handleSubmit} className={styles.LoginForm}>
        <h3>
          Log in to your account<span>.</span>
        </h3>
        <label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type={passwordShow ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button>Forgot password?</button>
          <button
            onClick={togglePasswordShow}
            className={styles.TogglePasswordBtn}
          >
            <img src={togglePassword} alt="toggle_password_icon" />
          </button>
        </label>
        <button className={styles.LoginBtn}>
          {!isLoading ? "Login" : <Spinner />}
        </button>
        <hr />
        <p className={styles.Register}>
          Don't have an account? <button>Register!</button>
        </p>
      </form>
    </Fragment>
  );
};

export default LoginForm;
