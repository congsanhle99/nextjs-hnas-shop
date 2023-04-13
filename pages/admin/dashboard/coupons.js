/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Create from "../../../components/admin/coupons/Create";
import List from "../../../components/admin/coupons/List";
import Layout from "../../../components/admin/layout";
import Coupon from "../../../models/Coupon";
import db from "../../../utils/db";

const coupons = ({ coupons }) => {
  const [data, setData] = useState(coupons);
  return (
    <Layout>
      <div className="">
        <Create setCoupons={setData} />
        <List coupons={data} setCoupons={setData} />
      </div>
    </Layout>
  );
};

export default coupons;

export async function getServerSideProps(context) {
  db.connectDb();
  const coupons = await Coupon.find({}).sort({ updatedAt: -1 }).lean();
  console.log("coupons: ", coupons);
  return {
    props: {
      coupons: JSON.parse(JSON.stringify(coupons)),
    },
  };
}
