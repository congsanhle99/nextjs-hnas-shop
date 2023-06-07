import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";
import ShopNow from "./shopNow";

const Ad = () => {
  return (
    <Link href="/browse">
      <div className={styles.ad}>
        <ShopNow />
      </div>
    </Link>
  );
};

export default Ad;
