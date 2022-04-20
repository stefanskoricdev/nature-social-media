import styles from "./WarningModal.module.scss";
import { AiFillQuestionCircle } from "react-icons/ai";
import Spinner from "../../Spinner/Spinner";

const WarningModal = ({
  message,
  onConfirm,
  onDiscard,
  isLoading,
  isError,
}) => {
  return (
    <section className={styles.WarningModal}>
      <AiFillQuestionCircle color="#00B960" fontSize="4rem" />
      <p>{!isError ? message : isError}</p>
      <section className={styles.ModalOptions}>
        <button onClick={onDiscard} className={styles.Discard}>
          {!isError ? "No" : "Discard"}
        </button>
        {!isError && (
          <button onClick={onConfirm} className={styles.Confirm}>
            {!isLoading ? "Yes" : <Spinner />}
          </button>
        )}
      </section>
    </section>
  );
};

export default WarningModal;
