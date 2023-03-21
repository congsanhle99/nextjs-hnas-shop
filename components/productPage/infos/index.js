/* eslint-disable @next/next/no-img-element */
import { Rating } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import { TbMinus, TbPlus } from "react-icons/tb";
import Accordian from "./Accordian";
import Share from "./share";
import styles from "./styles.module.scss";

const Infos = ({ product, setActiveImg }) => {
  const router = useRouter();
  const [size, setSize] = useState(router.query.size);
  const [qty, setQty] = useState(1);

  // when style change
  useEffect(() => {
    setSize("");
    setQty(1);
  }, [router.query.style]);

  // when qty over piece available for each Size
  useEffect(() => {
    if (qty > product.quantity) {
      setQty(product.quantity);
    }
  }, [router.query.size]);
  //

  // add product to cart
  const addToCartHandler = async () => {};
  //
  return (
    <div className={styles.infos}>
      <div className={styles.infos__container}>
        <h1 className={styles.infos__name}>{product.name}</h1>
        <h2 className={styles.infos__sku}>{product.sku}</h2>
        <div className={styles.infos__rating}>
          <Rating
            name="half-rating-read"
            defaultValue={product.rating}
            precision={0.5}
            readOnly
            style={{ color: "#facf19" }}
          />
          {product.numberReview}
          {product.numberReview === 1 ? " review" : " reviews"}
        </div>
        <div className={styles.infos__price}>
          {!size ? <h2>{product.priceRange}</h2> : <h2>{product.price}</h2>}
          {product.discount > 0 ? (
            <h3>
              {size && <span>{product.priceBefore}$</span>}
              <span>(-{product.discount}%)</span>
            </h3>
          ) : (
            ""
          )}
        </div>
        <span className={styles.infos__shipping}>
          {product.shipping ? `+${product.shipping}$ Shipping fee` : "Free Shipping"}
        </span>
        <span>
          {size ? product.quantity : product.sizes.reduce((start, next) => start + next.qty, 0)} pieces available.
        </span>
        <div className={styles.infos__sizes}>
          <h4>Select a Size:</h4>
          <div className={styles.infos__sizes_wrap}>
            {product.sizes.map((s, i) => (
              <Link key={i} href={`/product/${product.slug}?style=${router.query.style}&size=${i}`}>
                <div
                  className={`${styles.infos__sizes_size} ${i == router.query.size && styles.active_size}`}
                  onClick={() => setSize(s.size)}
                >
                  {s.size}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.infos__colors}>
          {product.colors.map((color, i) => (
            <span
              key={i}
              className={`${i == router.query.style ? styles.active_color : ""}`}
              onMouseOver={() => setActiveImg(product.subProduct[i].images[0].url)}
              onMouseLeave={() => setActiveImg("")}
            >
              <Link href={`/product/${product.slug}?style=${i}`}>
                <img src={color.image} alt="color img" />
              </Link>
            </span>
          ))}
        </div>
        <div className={styles.infos__qty}>
          <button onClick={() => qty > 1 && setQty((prev) => prev - 1)}>
            <TbMinus />
          </button>
          <span>{qty}</span>
          <button onClick={() => qty < product.quantity && setQty((prev) => prev + 1)}>
            <TbPlus />
          </button>
        </div>
        <div className={styles.infos__actions}>
          <button
            disabled={product.quantity < 1}
            style={{ cursor: `${product.quantity < 1 ? "not-allowed" : ""}` }}
            onClick={() => addToCartHandler()}
          >
            <BsHandbagFill />
            <b>ADD TO CARD</b>
          </button>
          <button>
            <BsHeart />
            <b>WISHLIST</b>
          </button>
        </div>
        <Share />
        <Accordian details={[product.description, ...product.details]} />
      </div>
    </div>
  );
};

export default Infos;
