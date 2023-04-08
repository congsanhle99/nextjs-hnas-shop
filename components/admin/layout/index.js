import React from "react";
import styles from "./styles.module.scss";
import Sidebar from "./sidebar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { expandSidebar } = useSelector((state) => ({ ...state }));
  const showSidebar = expandSidebar.expandSidebar;

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div style={{ marginLeft: `${showSidebar ? "280px" : "80px"} ` }} className={styles.layout__main}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
