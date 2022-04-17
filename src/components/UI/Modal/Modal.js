import styles from "./Modal.module.scss";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";
import ReactDOM from "react-dom";

const Modal = ({ children }) => {
  const modalEl = (
    <section className={styles.Modal}>
      <button className={styles.CloseModalBtn}>
        <IoClose color="#000000" fontSize="1.4rem" />
      </button>
      {children}
    </section>
  );
  return <Fragment>{modalEl}</Fragment>;
  /*  <Fragment>
      {ReactDOM.createPortal(modalEl, document.getElementById("modal"))}
    </Fragment> */
};

export default Modal;
