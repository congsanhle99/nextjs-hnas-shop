/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import Header from "../../components/header/Header";
import Order from "../../models/Order";
import styles from "../../styles/order.module.scss";

const order = ({ order }) => {
  return (
    <>
      <Header />

      <div className={styles.order}>
        <div className={styles.container}>
          <div className={styles.order__infos}>
            <div className={styles.order__header}>
              <div className={styles.order__header_head}>
                Home <IoIosArrowForward /> Orders <IoIosArrowForward /> ID {order._id}
              </div>
              <div className={styles.order__header_status}>
                Payment Status:
                {order.isPaid ? (
                  <img src="../../../images/paid/verified.png" alt="paid" />
                ) : (
                  <img src="../../../images/paid/unverified.png" alt="paid" />
                )}
              </div>
              <div className={styles.order__header_status}>
                Order Status:{" "}
                <span
                  className={
                    order.status == "Not Processed"
                      ? styles.not_processed
                      : order.status == "Processing"
                      ? styles.processing
                      : order.status == "Dispatched"
                      ? styles.dispatched
                      : order.status == "Cancel"
                      ? styles.cancel
                      : order.status == "Completed"
                      ? styles.completed
                      : ""
                  }
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div className={styles.order__products}>
              {order.products.map((product) => (
                <div className={styles.product} key={product._id}>
                  <div className={styles.product__img}>
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className={styles.product__infos}>
                    <h1 className={styles.product__infos_name}>
                      {product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}
                    </h1>
                    <div className={styles.product__infos_style}>
                      <img src={product.color.image} alt="" /> / {product.size}
                    </div>
                    <div className={styles.product__infos_priceQty}>
                      {product.price}$ x {product.qty}
                    </div>
                    <div className={styles.product__infos_total}>{product.price * product.qty}$</div>
                  </div>
                </div>
              ))}
              <div className={styles.order__products_total}>
                {order.couponApplied ? (
                  <>
                    <div className={styles.order__products_total_sub}>
                      <span>Subtotal </span>
                      <span>{order.totalBeforeDiscount}$</span>
                    </div>
                    <div className={styles.order__products_total_sub}>
                      <span>
                        Coupon Applied <em>({order.couponApplied})</em>
                      </span>
                      <span> -{(order.totalBeforeDiscount - order.total).toFixed(2)}$</span>
                    </div>
                    <div className={styles.order__products_total_sub}>
                      <span>Tax Price </span>
                      <span>+{order.taxPrice}</span>
                    </div>
                    <div className={`${styles.order__products_total_sub} ${styles.borderTop}`}>
                      <span>TOTAL TO PAY </span>
                      <b>{order.total}$</b>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.order_products_total_sub}>
                      <span>Tax Price </span>
                      <span>+{order.taxPrice}</span>
                    </div>
                    <div className={`${styles.order__products_total_sub} ${styles.borderTop}`}>
                      <span>TOTAL TO PAY </span>
                      <b>{order.total}$</b>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className={styles.order__actions}>
            <div className={styles.order__address}>
              <h1>Customer&apos;s Order</h1>
              <div className={styles.order__address_user}>
                <div className={styles.order__address_user_infos}>
                  <img src={order.user.image} alt="" />
                  <div>
                    <span>{order.user.name}</span>
                    <span>{order.user.email}</span>
                  </div>
                </div>
              </div>

              <div className={styles.order__address_shipping}>
                <h2>Shipping Address</h2>
                <span>
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </span>
                <span>{order.shippingAddress.address1}</span>
                <span>{order.shippingAddress.address2}</span>
                <span>
                  {order.shippingAddress.state}, {order.shippingAddress.city}
                </span>
                <span>{order.shippingAddress.zipCode}</span>
                <span>{order.shippingAddress.Country}</span>
              </div>

              <div className={styles.order__address_shipping}>
                <h2>Billing Address</h2>
                <span>
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </span>
                <span>{order.shippingAddress.address1}</span>
                <span>{order.shippingAddress.address2}</span>
                <span>
                  {order.shippingAddress.state}, {order.shippingAddress.city}
                </span>
                <span>{order.shippingAddress.zipCode}</span>
                <span>{order.shippingAddress.Country}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
