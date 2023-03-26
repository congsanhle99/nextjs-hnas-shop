/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartHeader from "../components/cart/cartHeader";
import Checkout from "../components/cart/checkout";
import EmptyCart from "../components/cart/empty";
import Header from "../components/cart/header";
import Product from "../components/cart/product";
import styles from "../styles/cart.module.scss";

const cart = () => {
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);

  console.log("selected: ", selected);

  return (
    <>
      <Header />
      <div className={styles.cart}>
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <CartHeader cartItems={cart.cartItems} selected={selected} setSelected={setSelected} />
            <div className={styles.cart__products}>
              {cart.cartItems.map((product) => (
                <Product key={product._uid} product={product} selected={selected} setSelected={setSelected} />
              ))}
            </div>
            <Checkout subtotal="5458" shippingFee="" total="5458" selected={[]} />
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </>
  );
};

export default cart;
