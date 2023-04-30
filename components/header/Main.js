/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { RiSearch2Line } from "react-icons/ri";
import styles from "./styles.module.scss";
// import { useSelector } from "react-redux";

const Main = ({ searchHandler }) => {
  // const cart = useSelector((state) => ({ ...state }));
  const router = useRouter();
  const [query, setQuery] = useState(router.query.search || "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (router.pathname !== "/browse") {
      if (query.length > 1) {
        router.push(`/browse?search=${query}`);
      }
    } else {
      searchHandler(query);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/">
          <a className={styles.logo}>
            <img src="../../../images/logo.png" alt="" />
          </a>
        </Link>
        <form onSubmit={(e) => handleSearch(e)} className={styles.search}>
          <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit" className={styles.search__icon}>
            <RiSearch2Line />
          </button>
        </form>
        <Link href="/cart">
          <a className={styles.cart}>
            <FaOpencart />
            <span>0</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Main;
