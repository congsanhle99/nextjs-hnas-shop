/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useEffect } from "react";
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

  const [shippingFee, setShippingFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setShippingFee(selected.reduce((a, c) => a + Number(c.shipping), 0).toFixed(2));
    setSubtotal(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));
    setTotal((selected.reduce((a, c) => a + c.price * c.qty, 0) + Number(shippingFee)).toFixed(2));
  }, [selected]);

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
            <Checkout subtotal={subtotal} shippingFee={shippingFee} total={total} selected={selected} />
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </>
  );
};

export default cart;
