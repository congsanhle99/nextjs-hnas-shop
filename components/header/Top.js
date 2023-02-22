/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";

const Top = () => {
  // const [loggedIn, setLoggedIn] = useState(true);
  const [visible, setVisible] = useState(false);
  const { data: session } = useSession();

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div className=""></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <img
              src="https://www.seekpng.com/png/full/47-477206_vietnam-war-flag-of-vietnam-south-vietnam-indochina.png"
              alt="flag"
            />
            <span>VietNam / VND</span>
          </li>
          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
            <span>Helps</span>
          </li>
          <li className={styles.li}>
            <BsSuitHeart />
            <Link href="/profile/whishlist">
              <span>Whishlist</span>
            </Link>
          </li>
          <li className={styles.li} onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            {session ? (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <img src={session.user.image} alt="avatar" />
                  <span>{session.user.name}</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )}
            {visible && <UserMenu session={session} />}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Top;
