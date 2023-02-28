import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log("session", session);
  return (
    <>
      <Header></Header>
      <Footer></Footer>
    </>
  );
}
