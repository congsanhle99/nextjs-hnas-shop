import React from "react";
import Category from "../models/Category";
import Product from "../models/Product";
import SubCategory from "../models/SubCategory";
import styles from "../styles/browse.module.scss";
import { filterArray, randomize, removeDuplicates } from "../utils/arrays";
import db from "../utils/db";

const browse = () => {
  return <div className={styles}>browse</div>;
};

export default browse;

export async function getServerSideProps(context) {
  await db.connectDb();
  let productsDb = await Product.find().sort({ createAt: -1 }).lean();
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
    props: {},
  };
}
