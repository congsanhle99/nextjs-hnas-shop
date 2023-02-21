/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./styles.module.scss";
import a from "../../public/images/payment/visa.png";
const Payment = () => {
  return (
    <div className={styles.footer__payment}>
      <h3>WE ACCEPT</h3>
      <div className={styles.footer__flexwrap}>
        <img src="../../../images/payment/mastercard.png" alt="mastercard" />
        <img src="../../../images/payment/paypal.png" alt="paypal" />
        <img src="../../../images/payment/visa.png" alt="visa" />
      </div>
    </div>
  );
};

export default Payment;
