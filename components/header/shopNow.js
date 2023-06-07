import React from "react";
import styles from "./styles.module.scss";
import { AiFillRightCircle } from "react-icons/ai";

const ShopNow = () => {
  return (
    <div className={styles.shopNow}>
      <span>Shop Now</span>
      <AiFillRightCircle size={24} />
    </div>
  );
};

export default ShopNow;
