/* eslint-disable react-hooks/rules-of-hooks */
import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { SiProducthunt } from "react-icons/si";
import { SlHandbag } from "react-icons/sl";
import { TbUsers } from "react-icons/tb";
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
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card__icon}>
              <TbUsers />
            </div>
            <div className={styles.card__info}>
              <h4>+{users.length}</h4>
              <span>Users</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SlHandbag />
            </div>
            <div className={styles.card__info}>
              <h4>+{orders.length}</h4>
              <span>Orders</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__icon}>
              <SiProducthunt />
            </div>
            <div className={styles.card__info}>
              <h4>+{products.length}</h4>
              <span>Product</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card__icon}>
              <GiTakeMyMoney />
            </div>
            <div className={styles.card__info}>
              <h4>+{orders.reduce((sum, value) => sum + value.total, 0)}$</h4>
              <h5>-{orders.filter((o) => !o.isPaid).reduce((a, val) => a + val.total, 0)}$ UnPaid yet!</h5>
              <span>Total Earning</span>
            </div>
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
