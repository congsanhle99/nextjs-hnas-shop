import styles from "./styles.module.scss";
import React from "react";
import Ad from "./Ad";
import Top from "./Top";
import Main from "./Main";

const Header = ({ searchHandler }) => {
  return (
    <header className={styles.header}>
      <Ad />
      <Top />
      <Main searchHandler={searchHandler} />
    </header>
  );
};

export default Header;
