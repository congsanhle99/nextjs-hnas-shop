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

  const filter = ({ search, category, brand, style, size, color }) => {
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
    if (size) {
      query.size = size;
    }
    if (color) {
      query.color = color;
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

  const categoryHandler = (category) => {
    filter({ category });
  };

  const brandHandler = (brand) => {
    filter({ brand });
  };

  const styleHandler = (style) => {
    filter({ style });
  };

  const sizeHandler = (size) => {
    filter({ size });
  };

  const colorHandler = (color) => {
    filter({ color });
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
            <CategoryFilter categories={categories} subCategories={subCategories} categoryHandler={categoryHandler} />
            <SizesFilter sizes={sizes} sizeHandler={sizeHandler} />
            <ColorsFilter colors={colors} colorHandler={colorHandler} />
            <BrandsFilter brands={brands} brandHandler={brandHandler} />
            <StylesFilter dataStyles={dataStyles} styleHandler={styleHandler} />
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
  const categoryQuery = query.category || "";
  // const brandQuery = query.brand || "";
  // --- mul filter stye
  const styleQuery = query.style?.split("_") || "";
  const styleRegex = `^${styleQuery[0]}`;
  const styleSearchRegex = createRegex(styleQuery, styleRegex);
  // --- mul filter size
  const sizeQuery = query.size?.split("_") || "";
  const sizeRegex = `^${sizeQuery[0]}`;
  const sizeSearchRegex = createRegex(sizeQuery, sizeRegex);
  // --- mul filter color
  const colorQuery = query.color?.split("_") || "";
  const colorRegex = `^${colorQuery[0]}`;
  const colorSearchRegex = createRegex(colorQuery, colorRegex);
  // --- mul filter brand
  const brandQuery = query.brand?.split("_") || "";
  const brandRegex = `^${brandQuery[0]}`;
  const brandSearchRegex = createRegex(brandQuery, brandRegex);

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

  const category = categoryQuery && categoryQuery !== "" ? { category: categoryQuery } : {};
  // const brand = brandQuery && brandQuery !== "" ? { brand: brandQuery } : {};

  const style =
    styleQuery && styleQuery !== ""
      ? {
          "details.value": {
            // regex operator is used to search for strings in collection
            $regex: styleSearchRegex,
            // provide some additional options in regex operator
            // "i" searching a result without considering case sensitivity
            $options: "i",
          },
        }
      : {};

  const size =
    sizeQuery && sizeQuery !== ""
      ? {
          "subProducts.sizes.size": {
            $regex: sizeSearchRegex,
            $options: "i",
          },
        }
      : {};

  const color =
    colorQuery && colorQuery !== ""
      ? {
          "subProducts.color.color": {
            $regex: colorSearchRegex,
            $options: "i",
          },
        }
      : {};

  const brand =
    brandQuery && brandQuery !== ""
      ? {
          brand: {
            $regex: brandSearchRegex,
            $options: "i",
          },
        }
      : {};

  function createRegex(data, styleRegex) {
    if (data.length > 1) {
      for (let i = 1; i < data.length; i++) {
        styleRegex += `|^${data[i]}`;
      }
    }
    return styleRegex;
  }
  //

  await db.connectDb();
  let productsDb = await Product.find({ ...search, ...category, ...brand, ...style, ...size, ...color })
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
  let colors = await Product.find({ ...category }).distinct("subProducts.color.color");
  let brandsDb = await Product.find({ ...category }).distinct("brand");
  let sizes = await Product.find({ ...category }).distinct("subProducts.sizes.size");
  let details = await Product.find({ ...category }).distinct("details");
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
