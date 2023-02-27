import React from "react";
import styles from "./styles.module.scss";
import DotLoading from "react-spinners/DotLoader";

const DotLoader = ({ loading }) => {
  return (
    <div className={styles.loader}>
      <DotLoading color="rgba(252, 70, 100, 1)" loading={loading} />
    </div>
  );
};

export default DotLoader;
