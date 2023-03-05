/* eslint-disable @next/next/no-img-element */
import React from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import styles from "./styles.module.scss";
import { useMediaQuery } from "react-responsive";

const Category = ({ header, products, background }) => {
  const isMedium = useMediaQuery({ query: "(max-width:1300px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });

  return (
    <div className={styles.category} style={{ background: `${background}` }}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <BsArrowRightCircle />
      </div>
      <div className={styles.category__products}>
        {products.slice(0, isMobile ? 6 : isMedium ? 4 : 6).map((product, idx) => (
          <div className={styles.product} key={idx}>
            <img src={product.image} alt="dress" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
