/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { MdFlashOn } from "react-icons/md";

const FlashCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        <Link href={product.link}>
          <img src={product.image} alt="item" />
        </Link>
        <div className={styles.flash}>
          <MdFlashOn />
          <span>-{product.discount}</span>
        </div>
      </div>
      <div className={styles.card__price}>
        {/* price */}
        <span>USD{(product.price - product.price / product.discount).toFixed(2)}$</span>
        {/* price discount */}
        <span>-USD{(product.price - (product.price - product.price / product.discount)).toFixed(2)}$</span>
      </div>
      <div className={styles.card__bar}>
        <div className={styles.card__bar_inner} style={{ width: "75%" }}></div>
      </div>
      <div className={styles.card__percentage}>{product.sold}%</div>
    </div>
  );
};

export default FlashCard;
