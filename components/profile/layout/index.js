import Head from "next/head";
import React from "react";
import Header from "../../header/Header";
import Sidebar from "../sidebar";
import styles from "./styles.module.scss";

const Layout = ({ session, tab, children }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>{session?.name}</title>
      </Head>
      <Header />
      <div className={styles.layout__container}>
        <Sidebar
          data={{
            image: session?.image,
            name: session?.name,
            tab,
          }}
        />
        <div className={styles.layout__content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
