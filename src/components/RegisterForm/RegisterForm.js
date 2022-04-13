import styles from "./RegisterForm.module.scss";
import RadioBtn from "./RadioBtn/RadioBtn";
import { useState } from "react";

const RegisterForm = () => {
  const [userType, setUserType] = useState("user");

  const handleUserTypeChange = (e) => {
    const type = e.target.getAttribute("data-type");
    setUserType(type);
  };

  return (
    <form className={styles.RegisterForm}>
      <h3>
        Create new account<span>.</span>
      </h3>
      <div className={styles.PersonalInfo}>
        <input type="text" name="firstName" placeholder="First Name" />
        <input type="text" name="lastName" placeholder="Last Name" />
      </div>
      <input type="text" name="userName" placeholder="Username" />
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
      />
      <input type="date" name="dateOfBirth" />
      <div className={styles.UserType}>
        <RadioBtn
          labelTitle="User"
          checked={userType === "user" ? true : false}
          handleChange={handleUserTypeChange}
          type="user"
        />
        <RadioBtn
          labelTitle="Admin"
          checked={userType === "admin" ? true : false}
          handleChange={handleUserTypeChange}
          type="admin"
        />
      </div>
      <button className={styles.SignupBtn}>Sign up</button>
      <hr />
      <p className={styles.Login}>
        Already have account? <button>Login!</button>
      </p>
    </form>
  );
};

export default RegisterForm;
