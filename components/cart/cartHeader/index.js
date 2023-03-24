import React from "react";
import styles from "./styles.module.scss";

const CartHeader = ({ cartItems }) => {
  return (
    <div className={`${styles.cart__header} ${styles.cart}`}>
      <h1>Item Summary ({cartItems.length})</h1>
      <div className={styles.flex}>
        <div className={styles.checkbox}></div>
        <span>Select all items</span>
      </div>
    </div>
  );
};

export default CartHeader;
