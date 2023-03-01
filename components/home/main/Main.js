import React from "react";
import Menu from "./Menu";
import Offers from "./Offers";
import styles from "./styles.module.scss";
import MainSwiper from "./Swiper";

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}>header</div>
      <Menu />
      <MainSwiper />
      <Offers />
      <div className={styles.user}>user</div>
    </div>
  );
};

export default Main;
