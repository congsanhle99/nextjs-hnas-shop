import React from "react";
import Layout from "../../../../components/admin/layout";
import Category from "../../../../models/Category";
import Product from "../../../../models/Product";
import styles from "../../../../styles/adminProduct.module.scss";
import db from "../../../../utils/db";

const all = ({ products }) => {
  console.log("products:::::::", products);
  return (
    <Layout>
      <div className={styles.header}>All Products</div>
    </Layout>
  );
};

export default all;

export async function getServerSideProps(context) {
  await db.connectDb();
  const products = await Product.find({})
    .populate({ path: "category", model: Category })
    .sort({ updatedAt: -1 })
    .lean();
  db.disconnectDb();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
