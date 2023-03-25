import React from "react";
import styles from "./styles.module.scss";

const Checkout = ({ subtotal, shippingFee, total, selected }) => {
  return (
    <div className={`${styles.cart__checkout} ${styles.cart}`}>
      <h2>Order Summary</h2>
      <div className={styles.cart__checkout_line}>
        <span>Subtotal</span>
        <span>US ${subtotal}</span>
      </div>
      <div className={styles.cart__checkout_line}>
        <span>Shipping</span>
        <span>+{shippingFee}$</span>
      </div>
      <div className={styles.cart__checkout_total}>
        <span>Total</span>
        <span>US {total}$</span>
      </div>
      <div className={styles.submit}>
        <button>Continue</button>
      </div>
    </div>
  );
};

export default Checkout;
