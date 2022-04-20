import styles from "./ErrorModal.module.scss";
import { MdOutlineSentimentVeryDissatisfied } from "react-icons/md";

const ErrorModal = ({ message }) => {
  return (
    <section className={styles.ErrorModal}>
      <MdOutlineSentimentVeryDissatisfied color="#FF0000" fontSize="4rem" />
      <p>{message}</p>
    </section>
  );
};

export default ErrorModal;
