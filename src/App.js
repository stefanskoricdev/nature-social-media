import styles from "./App.module.scss";
import { useContext } from "react";
import AuthContext from "./store/AuthProvider";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
function App() {
  const authCtx = useContext(AuthContext);

  const { isLoggedIn } = authCtx;

  console.log(isLoggedIn);

  return (
    <div className={styles.App}>
      <Login />
    </div>
  );
}

export default App;
