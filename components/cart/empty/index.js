/* eslint-disable @next/next/no-img-element */
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";

const EmptyCart = () => {
  const { data: session } = useSession();

  return (
    <div className={styles.empty}>
      <img src="../../../images/cart/cart-empty.png" alt="" />
      <h1>Cart is empty</h1>
      {!session && (
        <button className={styles.empty__btn} onClick={() => signIn()}>
          SIGN IN / REGISTER
        </button>
      )}
      <Link href="/browse">
        <a>
          <button className={`${styles.empty__btn} ${styles.empty__btn_v2}`}>SHOP NOW</button>
        </a>
      </Link>
    </div>
  );
};

export default EmptyCart;
