/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Infos from "../../components/productPage/infos";
import MainSwiper from "../../components/productPage/mainSwiper";
import Review from "../../components/productPage/reviews";
import Category from "../../models/Category";
import Product from "../../models/Product";
import User from "../../models/User";
import SubCategory from "../../models/SubCategory";
import styles from "../../styles/product.module.scss";
import db from "../../utils/db";

export default function product({ product }) {
  const [activeImg, setActiveImg] = useState("");
  return (
    <div>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Header />
      <div className={styles.product}>
        <div className={styles.container}>
          <div className={styles.path}>
            Home / {product.category.name}
            {product.subCategories.map((sub, idx) => (
              <span key={idx}>{sub.name}</span>
            ))}
          </div>
          <div className={styles.product__main}>
            <MainSwiper images={product.images} activeImg={activeImg} />
            <Infos product={product} setActiveImg={setActiveImg} />
          </div>
          <Review product={product} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  // const slug = query.slug;
  const style = query.style;
  const size = query.size || 0;

  db.connectDb();
  let product = await Product.findOne({ _slug: query.slug })
    .populate({ path: "category", model: Category })
    .populate({ path: "subCategories", model: SubCategory })
    .populate({ path: "reviews.reviewBy", model: User })
    .lean();
  // .populate({ path: "subCategories._id", model: SubCategory })

  let subProduct = product.subProduct[style];

  let prices = subProduct.sizes
    .map((s) => {
      return s.price;
    })
    .sort((a, b) => {
      return a - b;
    });

  let newProduct = {
    ...product,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    sku: subProduct.sku,
    colors: product.subProduct.map((p) => {
      return p.color;
    }),
    priceRange: subProduct.discount
      ? `From ${(prices[0] - prices[0] / subProduct.discount).toFixed(2)} to ${(
          prices[prices?.length - 1] -
          prices[prices?.length - 1] / subProduct.discount
        ).toFixed(2)}$`
      : `From ${prices[0]} to ${prices[prices?.length - 1]}$`,
    price:
      subProduct.discount > 0
        ? (subProduct.sizes[size].price - subProduct.sizes[size].price / subProduct.discount).toFixed(2)
        : subProduct.sizes[size].price,
    priceBefore: subProduct.sizes[size].price,
    quantity: subProduct.sizes[size].qty,
    ratings: [
      {
        percentage: 68,
      },
      {
        percentage: 18,
      },
      {
        percentage: 6,
      },
      {
        percentage: 2,
      },
      {
        percentage: 0,
      },
    ],
    allSizes: product.subProduct
      .map((p) => {
        return p.sizes;
      })
      .flat()
      .sort((a, b) => {
        return a.sizes - b.sizes;
      })
      .filter((element, index, array) => array.findIndex((el2) => el2?.size === element?.size) === index),
  };
  db.disconnectDb();

  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
    },
  };
}
