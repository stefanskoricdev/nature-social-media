import styles from "./Backdrop.module.scss";
import ReactDOM from "react-dom";
import { Fragment } from "react";

const Backdrop = ({ children, handleClick }) => {
  const backdropEl = (
    <section id="backdrop" onClick={handleClick} className={styles.Backdrop}>
      {children}
    </section>
  );
  return (
    <Fragment>
      {ReactDOM.createPortal(backdropEl, document.getElementById("backdrop"))}
    </Fragment>
  );
};

export default Backdrop;
