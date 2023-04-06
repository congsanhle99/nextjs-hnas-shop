import axios from "axios";
import { Form, Formik } from "formik";
import Router from "next/router";
import React, { useState } from "react";
import * as Yup from "yup";
import { applyCoupon } from "../../../requests/user";
import ShippingInput from "../../inputs/shippingInput";
import styles from "./styles.module.scss";

const Summary = ({ totalAfterDiscount, setTotalAfterDiscount, user, cart, paymentMethod, selectedAddress }) => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");
  const [orderError, setOrderError] = useState("");

  const validateCoupon = Yup.object({
    coupon: Yup.string().required("Please enter a coupon first!"),
  });

  const applyCouponHandler = async () => {
    const res = await applyCoupon(coupon);
    if (res.message) {
      setError(res.message);
    } else {
      setTotalAfterDiscount(res.totalAfterDiscount);
      setDiscount(res.discount);
      setError("");
    }
  };

  const placeOrderHandler = async () => {
    try {
      if (paymentMethod == "") {
        setOrderError("Please choose a payment method!");
        return;
      } else if (!selectedAddress) {
        setOrderError("Please choose a shipping address!");
        return;
      }
      const { data } = await axios.post("/api/order/create", {
        products: cart.products,
        shippingAddress: selectedAddress,
        paymentMethod,
        total: totalAfterDiscount !== "" ? totalAfterDiscount : cart.cartTotal,
        totalBeforeDiscount: cart.cartTotal,
        couponApplied: coupon,
      });
      Router.push(`/order/${data.order_id}`);
    } catch (error) {
      setOrderError(error.response.data.message);
    }
  };

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h3>Order Summary</h3>
      </div>
      <div className={styles.coupon}>
        <Formik
          enableReinitialize
          initialValues={{ coupon }}
          validationSchema={validateCoupon}
          onSubmit={() => applyCouponHandler()}
        >
          {(formik) => (
            <Form>
              <ShippingInput name="coupon" placeholder="Enter Coupon" onChange={(e) => setCoupon(e.target.value)} />
              {error && <span className={styles.error}>{error}</span>}
              <button type="submit">Apply</button>

              <div className={styles.infos}>
                <span>
                  Total: <b>{cart.cartTotal}$</b>
                </span>
                {discount > 0 && (
                  <span className={styles.coupon_span}>
                    Coupon applied: <b>-{discount}%</b>
                  </span>
                )}
                {totalAfterDiscount < cart.cartTotal && totalAfterDiscount != "" && (
                  <span>
                    New Price: <b>{totalAfterDiscount}$</b>
                  </span>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <button className={styles.submit_btn} onClick={() => placeOrderHandler()}>
        Place Order
      </button>
      {orderError && <span className={styles.orderError}>{orderError}</span>}
    </div>
  );
};

export default Summary;
