import styles from "./RadioBtn.module.scss";

const RadioBtn = ({ labelTitle, checked, handleChange, type }) => {
  return (
    <label className={styles.RadioBtn}>
      <input
        data-type={type}
        type="radio"
        name="type"
        checked={checked}
        onChange={handleChange}
      />
      <p>{labelTitle}</p>
    </label>
  );
};

export default RadioBtn;
