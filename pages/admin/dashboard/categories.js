/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Create from "../../../components/admin/categories/Create";
import Layout from "../../../components/admin/layout";
import Category from "../../../models/Category";
import db from "../../../utils/db";
import List from "../../../components/admin/categories/List";

const categories = ({ categories }) => {
  const [data, setData] = useState(categories);
  return (
    <Layout>
      <div className="">
        <Create setCategories={setData} />
        <List categories={data} setCategories={setData} />
      </div>
    </Layout>
  );
};

export default categories;

export async function getServerSideProps(context) {
  db.connectDb();
  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
