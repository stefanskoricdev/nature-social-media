import styles from "./Popover.module.scss";

const Popover = ({ handleClick, show, children }) => {
  return (
    <section
      className={
        show ? [styles.Popover, styles["active"]].join(" ") : styles.Popover
      }
    >
      <ul onClick={handleClick}>{children}</ul>
    </section>
  );
};

export default Popover;
