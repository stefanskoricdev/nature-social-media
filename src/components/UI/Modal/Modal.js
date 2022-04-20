import styles from "./Modal.module.scss";
import { IoClose } from "react-icons/io5";

const Modal = ({ children }) => {
  const modalEl = (
    <section className={styles.Modal}>
      <button id="closeBackdropBtn" className={styles.CloseModalBtn}>
        <IoClose color="#000000" fontSize="2.4rem" />
      </button>
      {children}
    </section>
  );
  return <>{modalEl}</>;
};

export default Modal;
