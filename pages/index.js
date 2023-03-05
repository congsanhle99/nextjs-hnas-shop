import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "../components/home/main/Main";
import FlashDeals from "../components/home/flashDeals";
import Category from "../components/home/category";
import { women_accessories, women_dresses, women_shoes, women_swiper } from "../data/home";
import { useMediaQuery } from "react-responsive";
import ProductsSwiper from "../components/productsSwiper";

export default function Home() {
  const { data: session } = useSession();
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });

  // console.log("session", session);
  return (
    <>
      <Header></Header>
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home__category}>
            <Category header="Dresses" products={women_dresses} background="#5a31f4" />
            {!isMedium && <Category header="Shoes" products={women_shoes} background="#000" />}
            {isMobile && <Category header="Shoes" products={women_shoes} background="#000" />}
            <Category header="Accessories" products={women_accessories} background="#3c811f" />
          </div>
          <ProductsSwiper products={women_swiper} />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
