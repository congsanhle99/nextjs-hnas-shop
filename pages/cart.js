/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useSelector } from "react-redux";
import EmptyCart from "../components/cart/empty";
import Header from "../components/cart/header";
import Product from "../components/cart/product";
import styles from "../styles/cart.module.scss";

const cart = () => {
  const { cart } = useSelector((state) => ({ ...state }));

  return (
    <>
      <Header />
      <div className={styles.cart}>
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <div className={styles.cart__products}>
              {cart.cartItems.map((product) => (
                <Product key={product._uid} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </>
  );
};

export default cart;
