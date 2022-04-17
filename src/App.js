import styles from "./App.module.scss";
import { useContext } from "react";
import AuthContext from "./store/AuthProvider";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import ViewPost from "./pages/ViewPost/ViewPost";
import Profile from "./pages/Profile/Profile";
import AddPost from "./pages/AddPost/AddPost";
import Admin from "./pages/Admin/Admin";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import Modal from "./components/UI/Modal/Modal";
import ErrorModal from "./components/UI/Modal/ErrorModal/ErrorModal";
import WarningModal from "./components/UI/Modal/WarningModal/WarningModal";

function App() {
  const authCtx = useContext(AuthContext);

  const { isLoggedIn } = authCtx;

  return (
    <section className={styles.App}>
      <Backdrop>
        <Modal>
          <WarningModal message="Are you sure you want to delete this post?" />
        </Modal>
      </Backdrop>
      {/* <Login /> */}
      <Layout>
        <Home />
      </Layout>
    </section>
  );
}

export default App;
