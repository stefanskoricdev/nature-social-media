import styles from "./LoginForm.module.scss";
import { useState } from "react";
import togglePassword from "../../assets/img/togglePassword.png";

const LoginForm = () => {
  const [passwordShow, setPasswordShow] = useState(false);

  const togglePasswordShow = (e) => {
    e.preventDefault();
    setPasswordShow((prevState) => !prevState);
  };

  return (
    <form className={styles.LoginForm}>
      <h3>
        Log in to your account<span>.</span>
      </h3>
      <label>
        <input type="text" name="username" placeholder="Username" />
      </label>
      <label>
        <p>Password</p>
        <input type={passwordShow ? "text" : "password"} name="password" />
        <button>Forgot password?</button>
        <button
          onClick={togglePasswordShow}
          className={styles.TogglePasswordBtn}
        >
          <img src={togglePassword} alt="toggle_password_icon" />
        </button>
      </label>
      <button className={styles.LoginBtn}>Log In</button>
      <hr />
      <p className={styles.Register}>
        Don't have an account? <button>Register!</button>
      </p>
    </form>
  );
};

export default LoginForm;
