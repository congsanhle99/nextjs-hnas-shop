import Link from "next/link";
import React from "react";
import { menuArray } from "../../../data/home";
import styles from "./styles.module.scss";
import { BiCategory } from "react-icons/bi";

const Menu = () => {
  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <a className={styles.menu__header}>
            <BiCategory />
            <b>Categories</b>
          </a>
        </li>
        <div className={styles.menu__list}>
          {menuArray.map((item) => (
            <li key={item.name}>
              <Link href={item.link}>
                <a href="">
                  <span>{item.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Menu;
