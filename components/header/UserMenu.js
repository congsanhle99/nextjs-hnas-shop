/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";
import { signIn, signOut } from "next-auth/react";
const UserMenu = ({ session }) => {
  return (
    <div className={styles.menu}>
      <h4>Welcome to HnasShop</h4>
      {session ? (
        <div className={styles.flex}>
          <img src={session.user.image} alt="avatar" className={styles.menu__img} />
          <div className={styles.col}>
            <span>Welcome back,</span>
            <h3>{session.user.name}</h3>
            <span onClick={() => signOut()}>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Register</button>
          <button className={styles.btn_outlined} onClick={() => signIn()}>
            Login
          </button>
        </div>
      )}
      {session && (
        <ul>
          <li>
            <Link href="/profile">Account</Link>
          </li>
          <li>
            <Link href="/profile/orders">My Orders</Link>
          </li>
          <li>
            <Link href="/profile/message">Message Center</Link>
          </li>
          <li>
            <Link href="/profile/address">Address</Link>
          </li>
          <li>
            <Link href="/profile/whishlist">WhishList</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
