/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../../styles/whishlist.module.scss";
import Link from "next/link";
import { MdPlayArrow } from "react-icons/md";

const whishlist = () => {
  return (
    <div className={styles.container}>
      <p>Let&apos;s meet again soon</p>
      <img src="../../../images/seeyousoon.png" alt="" />
      <div className={styles.btn}>
        <div className={styles.btn__home}>
          <Link href="/">Back to home</Link>
        </div>
        <div className={styles.btn__shopping}>
          <Link href="/browse">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default whishlist;
