/* eslint-disable react-hooks/rules-of-hooks */
import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import Dropdown from "../../../components/admin/dashboard/dropdown";
import Notifications from "../../../components/admin/dashboard/notifications";
import Layout from "../../../components/admin/layout";
import Order from "../../../models/Order";
import Product from "../../../models/Product";
import User from "../../../models/User";
import styles from "../../../styles/dashboard.module.scss";
import db from "../../../utils/db";

const dashboard = ({ users, orders, products }) => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>HnasShop - Admin Dashboard</title>
      </Head>
      <Layout>
        <div className={styles.header}>
          <div className={styles.header__search}>
            <label htmlFor="">
              <input type="text" name="" placeholder="Search here..." />
            </label>
          </div>
          <div className={styles.header__right}>
            <Dropdown userImage={session?.user?.image} />
            <Notifications />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default dashboard;

export async function getServerSideProps(context) {
  const users = await User.find().lean();
  const orders = await Order.find().populate({ path: "user", model: "User" }).lean();
  const products = await Product.find().lean();

  await db.connectDb();

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      orders: JSON.parse(JSON.stringify(orders)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
