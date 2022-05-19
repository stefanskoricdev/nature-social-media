import styles from "./LoginForm.module.scss";
import { useState, useContext } from "react";
import { useHttp } from "../../hooks/useHttp";
import {
  EMAIL_REGEX,
  EMPTY_INPUT_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  LOGIN_URL,
} from "../../util/constants";
import { Link } from "react-router-dom";
import AuthContext from "../../store/AuthProvider";
import togglePassword from "../../assets/img/togglePassword.png";
import { BiShow } from "react-icons/bi";
import Backdrop from "../UI/Backdrop/Backdrop";
import Modal from "../UI/Modal/Modal";
import ErrorModal from "../UI/Modal/ErrorModal/ErrorModal";
import Spinner from "../UI/Spinner/Spinner";
import {
  Box,
  Button,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
} from "@chakra-ui/react";

const LoginForm = () => {
  const [passwordShow, setPasswordShow] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {
    sendRequest: sendLoginRequest,
    isLoading,
    error,
    setError,
  } = useHttp();

  const authCtx = useContext(AuthContext);
  const { loginHandler, blockedUsers } = authCtx;

  const updateUi = (data) => {
    const isUserBlocked = blockedUsers.find(
      (user) => user.username === data.user.username
    );
    if (isUserBlocked) {
      setError("Sorry, your profile is blocked. Contact the admin");
      return;
    }
    loginHandler(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

    sendLoginRequest(
      {
        url: LOGIN_URL,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData,
      },
      updateUi
    );
  };

  console.log("I render");

  const togglePasswordShow = (e) => {
    e.preventDefault();
    setPasswordShow((prevState) => !prevState);
  };

  const closeBackdropHandler = () => {
    setError(null);
  };

  function clickMe() {
    setPasswordShow(true);
    setError(true);
  }

  return (
    <>
      <Button onClick={clickMe}>CLICK ME</Button>
      {/*  {error && (
        <Backdrop handleClick={closeBackdropHandler}>
          <Modal>
            <ErrorModal message={error} />
          </Modal>
        </Backdrop>
      )}
      <Box className={styles.LoginForm}>
        <h3>
          Log in to your account<span>.</span>
        </h3>
        <form noValidate onSubmit={handleSubmit}>
          <FormControl>
            <Input
              id="email"
              name="email"
              placeholder="Email"
              variant="flushed"
              h="4rem"
              fontSize="1.6rem"
            />
            <InputGroup mt="5.6rem">
              <Input
                id="password"
                name="password"
                placeholder="Password"
                type={passwordShow ? "text" : "password"}
                variant="flushed"
                h="4rem"
                fontSize="1.6rem"
              />
              <InputRightElement>
                <Button
                  bgColor="transparent"
                  p="0"
                  onClick={togglePasswordShow}
                >
                  <Icon w="100%" h="100%" as={BiShow} />
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <ChakraLink
            as={Link}
            to="/login"
            float="right"
            fontSize="1.6rem"
            marginTop="2.4rem"
          >
            Forgot password?
          </ChakraLink>
          <Button
            w="100%"
            h="5.6rem"
            colorScheme="lightGreen"
            fontSize="1.6rem"
            borderRadius="100px"
            m="4.2rem auto 0"
          >
            Log in
          </Button>
        </form>
      </Box> */}
      {/*  <form noValidate onSubmit={handleSubmit} className={styles.LoginForm}>
        <h3>
          Log in to your account<span>.</span>
        </h3>
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
          Don't have an account? <Link to="/register">Register!</Link>
        </p>
      </form> */}
    </>
  );
};

export default LoginForm;
