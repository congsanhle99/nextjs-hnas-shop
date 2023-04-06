import React from "react";
import Header from "../../components/header/Header";
import Order from "../../models/Order";
import styles from "../../styles/order.module.scss";

const order = ({ order }) => {
  return (
    <>
      <Header />
    </>
  );
};

export default order;
export async function getServerSideProps(context) {
  const { query } = context;
  const id = query.id;
  // populate({ path: "user", model: User })
  const order = await Order.findById(id).populate("user").lean();

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}
