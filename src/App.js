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

function App() {
  const authCtx = useContext(AuthContext);

  const { isLoggedIn } = authCtx;

  return (
    <section className={styles.App}>
      {/* <Login /> */}
      <Layout>
        <Admin />
      </Layout>
    </section>
  );
}

export default App;
