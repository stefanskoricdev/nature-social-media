import styles from "./App.module.scss";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
function App() {
  return (
    <div className={styles.App}>
      <Register />
    </div>
  );
}

export default App;
