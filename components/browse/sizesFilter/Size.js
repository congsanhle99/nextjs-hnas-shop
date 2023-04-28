import React from "react";
import styles from "../styles.module.scss";

const Size = ({ size }) => {
  return (
    <div className={styles.filter__sizes_size}>
      <input type="checkbox" name="size" id={size} />
      <label htmlFor={size}>{size}</label>
    </div>
  );
};

export default Size;
