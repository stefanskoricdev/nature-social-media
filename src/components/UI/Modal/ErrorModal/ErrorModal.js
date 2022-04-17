import styles from "./ErrorModal.module.scss";
import { ImSad2 } from "react-icons/im";

const ErrorModal = ({ message }) => {
  return (
    <section className={styles.ErrorModal}>
      <ImSad2 color="#FF0000" fontSize="3.3rem" />
      <p>{message}</p>
    </section>
  );
};

export default ErrorModal;
