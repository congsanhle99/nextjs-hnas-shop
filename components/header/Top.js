/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";

const Top = () => {
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div className=""></div>
        <ul className={styles.top__list}>
          <li>
            <img
              src="https://www.seekpng.com/png/full/47-477206_vietnam-war-flag-of-vietnam-south-vietnam-indochina.png"
              alt="flag"
            />
            <span>VietNam / vnd</span>
          </li>
          <li>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li>
            <span>Customer Service</span>
          </li>
          <li>
            <span>Helps</span>
          </li>
          <li>
            <BsSuitHeart />
            <Link href="/profile/whishlist">
              <span>Whishlist</span>
            </Link>
          </li>
          <li>
            <div className={styles.flex}>
              <RiAccountPinCircleLine />
              <span>Account</span>
              <RiArrowDropDownFill />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Top;
