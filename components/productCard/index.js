/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductSwiper from "./ProductSwiper";
import styles from "./styles.module.scss";

const ProductCard = ({ product }) => {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState(product.subProduct[active]?.images);
  const [prices, setPrices] = useState(
    product.subProduct[active]?.sizes
      .map((s) => {
        return s.price;
      })
      .sort((a, b) => {
        return a - b;
      })
  );

  const [styless, setStyless] = useState(
    product.subProduct.map((p) => {
      return p.color;
    })
  );
  useEffect(() => {
    setImages(product.subProduct[active]?.images);
    setPrices(
      product.subProduct[active]?.sizes
        .map((s) => {
          return s.price;
        })
        .sort((a, b) => {
          return a - b;
        })
    );
  }, [active]);
  // console.log({ images, prices, styless });

  return (
    <div className={styles.product}>
      <div className={styles.product__container}>
        <Link href={`/product/${product.slug}?style=${active}`}>
          <div className="">
            <ProductSwiper images={images} />
          </div>
        </Link>
        {product.subProduct[active]?.discount ? (
          <div className={styles.product__discount}>-{product.subProduct[active]?.discount}%</div>
        ) : (
          ""
        )}
        <div className={styles.product__infos}>
          <h1>{product.name.length > 42 ? `${product.name.substring(0, 42)}...` : product.name}</h1>
          <span>{prices.length === 1 ? `USD${prices[0]}$` : `USD${prices[0]} - ${prices[prices.length - 1]}$`}</span>
          <div className={styles.product__colors}>
            {styless &&
              styless.map((style, i) =>
                style.image ? (
                  <img
                    src={style.image}
                    className={i == active && styles.active}
                    onMouseOver={() => {
                      setImages(product.subProduct[i].images);
                      setActive(i);
                    }}
                    key={i}
                    alt=""
                  />
                ) : (
                  // eslint-disable-next-line react/jsx-key
                  <span
                    style={{ backgroundColor: `${style.color}` }}
                    onMouseOver={() => {
                      setImages(product.subProduct[i].images);
                      setActive(i);
                    }}
                  ></span>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
