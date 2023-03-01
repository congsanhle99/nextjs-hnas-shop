import React from "react";
import MainSwiper from "./Swiper";
import styles from "./styles.module.scss";

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>header</div>
      <div className={styles.menu}>menu</div>
      <MainSwiper />
      <div className={styles.offers}>offers</div>
      <div className={styles.user}>user</div>
    </div>
  );
};

export default Main;
