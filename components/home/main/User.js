/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { userSwiperArray } from "../../../data/home";
import styles from "./styles.module.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
// import required modules
import { signIn } from "next-auth/react";
import { Autoplay, EffectCards, Navigation } from "swiper";

const User = () => {
  const { data: session } = useSession();
  return (
    <div className={styles.user}>
      <div className={styles.user__container}>
        {session ? (
          <div className={styles.user__infos}>
            <img src={session.user?.image} alt="" />
            <h4>{session.user?.name}</h4>
          </div>
        ) : (
          <div className={styles.user__infos}>
            <img src="https://img.freepik.com/premium-vector/avatar-profile-icon_188544-4755.jpg?w=740" alt="" />
            <div className={styles.user__infos_btns}>
              <button onClick={() => signIn()}>Register</button>
              <button onClick={() => signIn()}>Login</button>
            </div>
          </div>
        )}
        <ul className={styles.user__links}>
          <li>
            <Link href="">
              <a>
                <IoSettingsOutline />
              </a>
            </Link>
          </li>
          <li>
            <Link href="">
              <a>
                <HiOutlineClipboardList />
              </a>
            </Link>
          </li>
          <li>
            <Link href="">
              <a>
                <AiOutlineMessage />
              </a>
            </Link>
          </li>
          <li>
            <Link href="">
              <a>
                <BsHeart />
              </a>
            </Link>
          </li>
        </ul>
        <div className={styles.user__swiper}>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            navigation={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[EffectCards, Navigation, Autoplay]}
            className="userMenu__swiper"
            style={{ maxWidth: "180px", height: "240px", marginTop: "3rem" }}
          >
            {userSwiperArray.map((item) => (
              <SwiperSlide key={item.id}>
                <Link href={item.link}>
                  <img src={item.image} alt="" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default User;
