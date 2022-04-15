import styles from "./RadioBtn.module.scss";

const RadioBtn = ({ labelTitle, checked, handleChange, dataType, value }) => {
  return (
    <label className={styles.RadioBtn}>
      <input
        data-type={dataType}
        type="radio"
        name="type"
        checked={checked}
        onChange={handleChange}
        value={value}
      />
      <p>{labelTitle}</p>
    </label>
  );
};

export default RadioBtn;
