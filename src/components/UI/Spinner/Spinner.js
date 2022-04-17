import styles from "./Spinner.module.scss";

const Spinner = ({ color }) => {
  return (
    <div className={styles.LdsEllipsis}>
      <div style={color ? { background: `${color}` } : null}></div>
      <div style={color ? { background: `${color}` } : null}></div>
      <div style={color ? { background: `${color}` } : null}></div>
      <div style={color ? { background: `${color}` } : null}></div>
    </div>
  );
};

export default Spinner;
