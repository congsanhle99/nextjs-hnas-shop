/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { MdPlayArrow } from "react-icons/md";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <Link href="/">
            <img src="../../../images/logo.png" alt="" />
          </Link>
        </div>
        <div className={styles.header__right}>
          <Link href="/browse">
            <a>
              Continue Shopping
              <MdPlayArrow />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
