import React from "react";
import Menu from "./Menu";
import Offers from "./Offers";
import styles from "./styles.module.scss";
import MainSwiper from "./Swiper";
import User from "./User";
import Header from "./Header";

const Main = () => {
  return (
    <div className={styles.main}>
      <Header />
      <Menu />
      <MainSwiper />
      <Offers />
      <User />
    </div>
  );
};

export default Main;
