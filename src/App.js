import styles from "./App.module.scss";
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
  const shouldRedirect = true;

  const authCtx = useContext(AuthContext);

  const { isLoggedIn } = authCtx;

  return (
    <section className={styles.App}>
      {!isLoggedIn && (
        <Routes>
          <Route
            path="/"
            element={shouldRedirect && <Navigate replace to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="*"
            element={shouldRedirect && <Navigate replace to="/login" />}
          />
        </Routes>
      )}
      {isLoggedIn && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="view-post/:postId" element={<ViewPost />} />
            <Route path="profile/:username" element={<Profile />} />
            <Route path="add-new-post" element={<AddPost />} />
            <Route path="admin" element={<Admin />} />
            <Route
              path="*"
              element={shouldRedirect && <Navigate replace to="/home" />}
            />
          </Route>
        </Routes>
      )}
    </section>
  );
}

export default App;
