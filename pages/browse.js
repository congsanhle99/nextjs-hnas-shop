/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import BrandsFilter from "../components/browse/brandsFilter";
import CategoryFilter from "../components/browse/categoryFilter";
import ColorsFilter from "../components/browse/colorsFilter";
import GenderFilter from "../components/browse/genderFilter";
import HeadingFilter from "../components/browse/headingFilter";
import MaterialsFilter from "../components/browse/materialsFilter";
import PatternsFilter from "../components/browse/patternsFilter";
import SizesFilter from "../components/browse/sizesFilter";
import StylesFilter from "../components/browse/stylesFilter";
import Header from "../components/header/Header";
import ProductCard from "../components/productCard";
import Category from "../models/Category";
import Product from "../models/Product";
import SubCategory from "../models/SubCategory";
import styles from "../styles/browse.module.scss";
import { filterArray, randomize, removeDuplicates } from "../utils/arrays";
import db from "../utils/db";

const browse = ({ categories, subCategories, products, sizes, colors, brands, dataStyles, patterns, materials }) => {
  const router = useRouter();
  const path = router.pathname;
  const { query } = router;

  const filter = ({ search, category, brand, style }) => {
    const path = router.pathname;
    const { query } = router;

    if (search) {
      query.search = search;
    }
    if (category) {
      query.category = category;
    }
    if (brand) {
      query.brand = brand;
    }
    if (style) {
      query.style = style;
    }

    router.push({
      pathname: path,
      query: query,
    });
  };

  const searchHandler = (search) => {
    if (search == "") {
      filter({ search: {} });
    } else {
      filter({ search });
    }
  };

  return (
    <div className={styles.browse}>
      <Header searchHandler={searchHandler} />
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
            <CategoryFilter categories={categories} subCategories={subCategories} />
            <SizesFilter sizes={sizes} />
            <ColorsFilter colors={colors} />
            <BrandsFilter brands={brands} />
            <StylesFilter dataStyles={dataStyles} />
            <PatternsFilter patterns={patterns} />
            <MaterialsFilter materials={materials} />
            <GenderFilter />
          </div>
          <div className={styles.browse__store_products_wrap}>
            <HeadingFilter />
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
  // search feature
  const { query } = context;
  const searchQuery = query.search || "";
  const search =
    searchQuery && searchQuery !== ""
      ? {
          name: {
            // regex operator is used to search for strings in collection
            $regex: searchQuery,
            // provide some additional options in regex operator
            // "i" searching a result without considering case sensitivity
            $options: "i",
          },
        }
      : {};
  //

  await db.connectDb();
  let productsDb = await Product.find({ ...search })
    .sort({ createAt: -1 })
    .lean();
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
  let brands = removeDuplicates(brandsDb);

  db.disconnectDb();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
      sizes,
      colors,
      brands,
      dataStyles: styles,
      patterns,
      materials,
    },
  };
}
