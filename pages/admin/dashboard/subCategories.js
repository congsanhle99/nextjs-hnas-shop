/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Layout from "../../../components/admin/layout";
import Create from "../../../components/admin/subCategories/Create";
import List from "../../../components/admin/subCategories/List";
import Category from "../../../models/Category";
import SubCategory from "../../../models/SubCategory";
import db from "../../../utils/db";

const subCategories = ({ categories, subCategories }) => {
  const [data, setData] = useState(subCategories);
  return (
    <Layout>
      <div className="">
        <Create setSubCategories={setData} categories={categories} />
        <List categories={categories} subCategories={data} setSubCategories={setData} />
      </div>
    </Layout>
  );
};

export default subCategories;

export async function getServerSideProps(context) {
  db.connectDb();
  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  const subCategories = await SubCategory.find({})
    .populate({ path: "parent", model: Category })
    .sort({ updatedAt: -1 })
    .lean();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
    },
  };
}
