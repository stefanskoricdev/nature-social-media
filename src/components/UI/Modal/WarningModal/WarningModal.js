import styles from "./WarningModal.module.scss";
import { AiFillQuestionCircle } from "react-icons/ai";

const WarningModal = ({ message }) => {
  return (
    <section className={styles.WarningModal}>
      <AiFillQuestionCircle color="#00B960" fontSize="3.4rem" />
      <p>{message}</p>
      <section className={styles.ModalOptions}>
        <button className={styles.Discard}>No</button>
        <button className={styles.Confirm}>Yes</button>
      </section>
    </section>
  );
};

export default WarningModal;
