import styles from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.LdsEllipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
