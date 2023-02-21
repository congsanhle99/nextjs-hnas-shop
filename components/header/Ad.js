import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";

const Ad = () => {
  return (
    <Link href="/browse">
      <div className={styles.ad}>ADDD</div>
    </Link>
  );
};

export default Ad;
