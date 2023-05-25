/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { getSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiExternalLink } from "react-icons/fi";
import slugify from "slugify";
import Layout from "../../components/profile/layout";
import { ordersLinks } from "../../data/profileSidebar";
import Order from "../../models/Order";
import styles from "../../styles/profile.module.scss";

const index = ({ user, tab, orders }) => {
  const router = useRouter();
  return (
    <Layout session={user.user} tab={tab}>
      <Head>
        <title>Orders</title>
      </Head>
      <div className={styles.orders}>
        <div className={styles.header}>
          <h1>Filter By</h1>
        </div>
        <nav>
          <ul>
            {ordersLinks.map((link, idx) => (
              <li
                key={link.name}
                className={slugify(link.name, { lower: true }) == router.query.q?.split("__")[0] ? styles.active : ""}
              >
                <Link href={`/profile/orders?tab=${tab}&q=${slugify(link.name, { lower: true })}__${link.filter}`}>
                  <a title={link.name}>{link.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.header}>
          <h1>MY ORDERS</h1>
        </div>
        <table>
          <thead>
            <tr>
              <td>Order id</td>
              <td>Products</td>
              <td>Payment Method</td>
              <td>Total</td>
              <td>Paid</td>
              <td>Status</td>
              <td>View</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td className={styles.orders__images}>
                  {order.products.map((p) => (
                    <img src={p.image} key={p._id} alt="" />
                  ))}
                </td>
                <td>
                  {order.paymentMethod == "paypal"
                    ? "Paypal"
                    : order.paymentMethod == "credit_card"
                    ? "Credit Card"
                    : "COD"}
                </td>
                <td>{order.total}$</td>
                <td className={styles.orders__paid}>
                  {order.isPaid ? (
                    <img src="../../../images/users/verified.png" alt="" className={styles.verify} />
                  ) : (
                    <img src="../../../images/users/unverified.png" alt="" className={styles.verify} />
                  )}
                </td>
                <td>{order.status}</td>
                <td>
                  <Link href={`/order/${order._id}`}>
                    <FiExternalLink />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default index;

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });
  const tab = query.tab || 0;

  const filter = query.q.split("__")[1];

  let orders = [];
  if (!filter) {
    orders = await Order.find({ user: session?.user.id })
      .sort({
        createAt: -1,
      })
      .lean();
  } else if (filter == "paid") {
    orders = await Order.find({ user: session?.user.id, isPaid: true })
      .sort({
        createAt: -1,
      })
      .lean();
  } else if (filter == "unpaid") {
    orders = await Order.find({ user: session?.user.id, isPaid: false })
      .sort({
        createAt: -1,
      })
      .lean();
  } else {
    orders = await Order.find({ user: session?.user.id, status: filter })
      .sort({
        createAt: -1,
      })
      .lean();
  }
  return {
    props: {
      user: session,
      tab,
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
