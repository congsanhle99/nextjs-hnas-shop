/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";

const UserMenu = ({ log }) => {
  return (
    <div className={styles.menu}>
      <h4>Welcome to HnasShop</h4>
      {log ? (
        <div className={styles.flex}>
          <img
            src="https://e7.pngegg.com/pngimages/1008/377/png-clipart-computer-icons-avatar-user-profile-avatar-heroes-black-hair-thumbnail.png"
            alt="avatar"
            className={styles.menu__img}
          />
          <div className={styles.col}>
            <span>Welcome back,</span>
            <h3>Dannn</h3>
            <span>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Register</button>
          <button className={styles.btn_outlined}>Login</button>
        </div>
      )}
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
    </div>
  );
};

export default UserMenu;
