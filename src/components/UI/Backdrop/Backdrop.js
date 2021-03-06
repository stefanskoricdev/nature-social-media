import styles from "./Backdrop.module.scss";
import ReactDOM from "react-dom";

const Backdrop = ({ children, handleClick }) => {
  const backdropEl = (
    <section
      id="backdrop"
      onClick={(e) => {
        if (e.target.id === "backdrop" || e.target.id === "closeBackdropBtn") {
          handleClick();
        }
      }}
      className={styles.Backdrop}
    >
      {children}
    </section>
  );

  return (
    <>
      {ReactDOM.createPortal(backdropEl, document.getElementById("backdrop"))}
    </>
  );
};

export default Backdrop;
