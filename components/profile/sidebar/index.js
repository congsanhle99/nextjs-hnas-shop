/* eslint-disable @next/next/no-img-element */
import React from "react";
import { sidebarData } from "../../../data/profileSidebar";
import Item from "./item";
import styles from "./styles.module.scss";

const Sidebar = ({ data }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__container}>
        <img src={data.image} alt="" />
        <span className={styles.sidebar__name}>{data.name}</span>
        <ul>
          {sidebarData.map((item, idx) => (
            <Item key={idx} item={item} visible={data.tab == idx.toString()} index={idx.toString()} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
