/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import styles from "./styles.module.scss";
// Import Swiper React components
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.product}>
      <h1 className={styles.product__name}>{product.name}</h1>
      <h2 className={styles.product__category}>#{product.category?.name}</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="products_swiper"
        style={{ padding: "6px 0 6px 6px" }}
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          630: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 4,
          },
          1232: {
            slidesPerView: 5,
          },
          1520: {
            slidesPerView: 6,
          },
        }}
      >
        {product.subProducts.map((product, idx) => (
          <SwiperSlide key={product._id}>
            <div className={styles.product__item}>
              <div className={styles.product__item_img}>
                <img src={product.images[0].url} alt="" />
              </div>
              <div className={styles.product__actions}>
                <Link href={`/admin/dashboard/product/${product._id}`}>
                  <TbEdit />
                </Link>
                <Link href={`/product/${product.slug}?style=${idx}`}>
                  <AiOutlineEye />
                </Link>
                <Link href={""}>
                  <RiDeleteBin2Line />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCard;
