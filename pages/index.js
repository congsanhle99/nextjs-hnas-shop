import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "../components/home/main/Main";

export default function Home() {
  const { data: session } = useSession();
  console.log("session", session);
  return (
    <>
      <Header></Header>
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
