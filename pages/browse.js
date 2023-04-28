import Link from "next/link";
import React from "react";
import Header from "../components/header/Header";
import ProductCard from "../components/productCard";
import Category from "../models/Category";
import Product from "../models/Product";
import SubCategory from "../models/SubCategory";
import styles from "../styles/browse.module.scss";
import { filterArray, randomize, removeDuplicates } from "../utils/arrays";
import db from "../utils/db";

const browse = ({ categories, products }) => {
  console.log("categories: ", categories);
  console.log("products: ", products);
  return (
    <div className={styles.browse}>
      <Header />
      <div className={styles.browse__container}>
        <div className={styles.browse__path}>Home / Browse</div>
        <div className={styles.browse__tags}>
          {categories.map((c) => (
            <Link href="" key={c._id}>
              <a> {c.name}</a>
            </Link>
          ))}
        </div>

        <div className={styles.browse__store}>
          <div className={`${styles.browse__store_filters} ${styles.scrollbar}`}>
            <button className={styles.browse__clearBtn}>Clear All (3)</button>
          </div>
          <div className={styles.browse__store_products_wrap}>
            <div className={styles.browse__store_products}>
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default browse;

export async function getServerSideProps(context) {
  await db.connectDb();
  let productsDb = await Product.find().sort({ createAt: -1 }).lean();
  let products = randomize(productsDb);
  let categories = await Category.find().lean();
  let subCategories = await SubCategory.find()
    .populate({
      path: "parent",
      model: Category,
    })
    .lean();
  let colors = await Product.find().distinct("subProducts.color.color");
  let brandsDb = await Product.find().distinct("brand");
  let sizes = await Product.find().distinct("subProducts.sizes.size");
  let details = await Product.find().distinct("details");
  let stylesDb = filterArray(details, "Style");
  let patternsDb = filterArray(details, "Pattern Type");
  let materialsDb = filterArray(details, "Material");
  let styles = removeDuplicates(stylesDb);
  let patterns = removeDuplicates(patternsDb);
  let materials = removeDuplicates(materialsDb);

  console.log(randomize(sizes));

  db.disconnectDb();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
