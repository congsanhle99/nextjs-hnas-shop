import React from "react";
import styles from "./styles.module.scss";
import ListItem from "./ListItem";

const List = ({ coupons, setCoupons }) => {
  return (
    <ul className={styles.list}>
      {coupons.map((coupon) => (
        <ListItem coupon={coupon} setCoupons={setCoupons} key={coupon._id} />
      ))}
    </ul>
  );
};

export default List;
