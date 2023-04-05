/* eslint-disable react-hooks/rules-of-hooks */
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import Header from "../components/cart/header";
import Products from "../components/checkout/products";
import Shipping from "../components/checkout/shipping";
import Cart from "../models/Cart";
import User from "../models/User";
import styles from "../styles/checkout.module.scss";
import db from "../utils/db";
import Payment from "../components/checkout/payment";

const checkout = ({ cart, user }) => {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [paymentMethod, setPaymentMethod] = useState("");

  return (
    <>
      <Header />
      <div className={`${styles.container} ${styles.checkout}`}>
        <div className={styles.checkout__side}>
          <Shipping user={user} addresses={addresses} setAddresses={setAddresses} />
          <Products cart={cart} />
        </div>
        <div className={styles.checkout__side}>
          <Payment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
        </div>
      </div>
    </>
  );
};

export default checkout;

export async function getServerSideProps(context) {
  db.connectDb();
  const session = await getSession(context);
  const user = await User.findById(session.user.id);
  const cart = await Cart.findOne({ user: user._id });
  db.disconnectDb();
  if (!cart) {
    return {
      redirect: {
        destination: "/cart",
      },
    };
  }
  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
