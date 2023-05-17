/* eslint-disable @next/next/no-img-element */
import React from "react";
import { paymentMethods } from "../../../data/paymentMethods";
import styles from "./styles.module.scss";

const Payment = ({ paymentMethod, setPaymentMethod, profile }) => {
  return (
    <div className={styles.payment}>
      {!profile && (
        <div className={styles.header}>
          <h3>Payment Method</h3>
        </div>
      )}
      {paymentMethods.map((pm) => (
        <label
          htmlFor={pm.id}
          key={pm.id}
          className={styles.payment__item}
          onClick={() => setPaymentMethod(pm.id)}
          style={{ background: `${paymentMethod == pm.id ? "#f5f5f5" : ""} ` }}
        >
          <input type="radio" name="payment" id={pm.id} checked={paymentMethod == pm.id} />
          <img src={`../../../images/checkout/${pm.id}.png`} alt={pm.name} />
          <div className={styles.payment__item_col}>
            <span>Pay with {pm.name}</span>
            <p>
              {pm.images.length > 0
                ? pm.images.map((img) => <img src={`../../../images/payment/${img}.png`} alt="" key={pm.id} />)
                : pm.description}
            </p>
          </div>
        </label>
      ))}
    </div>
  );
};

export default Payment;
