/* eslint-disable @next/next/no-img-element */
import React from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import styles from "./styles.module.scss";

const Category = ({ header, products, background }) => {
  return (
    <div className={styles.category} style={{ background: `${background}` }}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <BsArrowRightCircle />
      </div>
      <div className={styles.category__products}>
        {products.map((product, idx) => (
          <div className={styles.product} key={idx}>
            <img src={product.image} alt="dress" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
