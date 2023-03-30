/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./styles.module.scss";

const PaymentMethods = () => {
  return (
    <div className={`${styles.card} ${styles.cart__method}`}>
      <h2 className={styles.header}>Payment Methods</h2>
      <div className={styles.images}>
        <img src="../../../images/payment/mastercard.png" alt="mastercard" />
        <img src="../../../images/payment/paypal.png" alt="paypal" />
        <img src="../../../images/payment/visa.png" alt="visa" />
      </div>
      <h2 className={styles.header}>Buyer Protection</h2>
      <div className={styles.protection}>
        <img src="../../../images/protection.png" alt="protection" />
        Get full refund if the item is not as described or if it&apos;s not delivered.
      </div>
    </div>
  );
};

export default PaymentMethods;
